// This library is responsible for getting blog posts from makrdown files
// Standard stuff
import fs from "fs";
import path from "path";
// Third Party Imports
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { Root, Element, ElementContent, Text } from "hast";
const postsDir = path.join(process.cwd(), "posts");
type PostData = {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  summary: string;
};

// Grabbing the files from the postsDir, the posts are in the .md format
export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDir);

  // Map array to get all the posts out of the app
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Using the gray matter module to grab the file contents for the metadata!
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  }) as PostData[];

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Returns all the post_ids available in the posts directory
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  //Using the gray matter function
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);

  //Fixing image paths, so they can be viewed in Github .mds more easily
  const fixedContent = matterResult.content.replace(
    /!\[(.*?)\]\(\.\.\/public\/(.*?)\)/g,
    "![$1](/$2)"
  );

  // Thanks for Gemini for solving explaining what each one does!
  const processedContent = await unified()
    .use(remarkParse) // Convert Markdown string to syntax tree (mdast)
    .use(remarkRehype) // Convert mdast to HTML syntax tree (hast)
    .use(() => (tree: Root) => {
      visit(tree, "element", (node: Element) => {
        // Look for paragraphs that contain images
        if (node.tagName === "p") {
          const imgIndex = node.children.findIndex(
            (child): child is Element =>
              child.type === "element" && child.tagName === "img"
          );

          if (imgIndex !== -1) {
            const imgNode = node.children[imgIndex] as Element;

            // Look for a following 'em' tag (the caption)
            const emNode = node.children.find(
              (child): child is Element =>
                child.type === "element" && child.tagName === "em"
            );

            // Transform the <p> into a Bulma <figure>
            node.tagName = "figure";
            node.properties = {
              ...node.properties,
              className: ["image", "has-text-centered", "mb-6", "mx-auto"],
            };

            // Style the image
            imgNode.properties = {
              ...imgNode.properties,
              className: ["is-inline-block"],
            };

            // Transform <em> into <figcaption>
            if (emNode) {
              emNode.tagName = "figcaption";
              emNode.properties = {
                ...emNode.properties,
                className: ["has-text-grey", "mt-2", "is-italic"],
              };
            }
          }
        }
      });
    })
    .use(rehypeHighlight) // Find code blocks and inject highlight.js classes
    .use(rehypeStringify) // Convert hast back to a string of HTML
    .process(fixedContent);

  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
