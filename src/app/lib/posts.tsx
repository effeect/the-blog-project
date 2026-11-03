// This library is responsible for getting blog posts from makrdown files
// Standard stuff
import fs from "fs";
import path from "path";
import { cache } from "react";
// Third Party Imports
import matter from "gray-matter";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import powershell from "highlight.js/lib/languages/powershell";
import { imageSize } from "image-size";
import { common } from "lowlight";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { Root, Element } from "hast";
import { Root as MarkdownRoot, Html } from "mdast";
import { PostData } from "@/app/types/PostData.type";

const postsDir = path.join(process.cwd(), "posts");
const publicDir = path.join(process.cwd(), "public");

// Posts only change with a deploy, so production reads them from disk once.
// Development re-reads them so that edits show up on refresh.
let sortedPosts: PostData[] | null = null;

// Grabbing the files from the postsDir, the posts are in the .md format
export function getSortedPosts() {
  if (sortedPosts && process.env.NODE_ENV === "production") return sortedPosts;

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

  sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedPosts;
}

export function getCurrentIndex(id: string) {
  const data = getSortedPosts();
  const current_id = id;
  // Returns the current index of the page being generated
  const current = data.findIndex(({ id }) => id == current_id);
  // Unknown id: nothing to report, let the caller handle the 404
  if (current === -1) return null;
  return { currentIndex: current, arrayLength: data.length };
}

// For next and Previous navigation of the site
export function getNextAndPrevPosts(id: string) {
  const data = getSortedPosts();
  const current_id = id;
  // Returns the current index of the page being generated
  const current = data.findIndex(({ id }) => id == current_id);
  // Unknown id: guard against indexing data[-2] etc. (would throw)
  if (current === -1) return null;
  // Returning the next and the previous index
  const prevIndex = () => {
    if (current == data.length - 1) {
      return data[current].id;
    } else {
      return data[current + 1].id;
    }
  };
  const nextIndex = () => {
    if (current == 0) {
      return data[current].id;
    } else {
      return data[current - 1].id;
    }
  };

  return {
    prevIndex: prevIndex(),
    nextIndex: nextIndex(),
  };
}

// Returns all the post_ids available in the posts directory
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);

  // Shape required by Next's generateStaticParams: the param object directly.
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ""),
    };
  });
}

// Raw HTML in markdown is dropped from the page, so unquoted JSX or generics in
// prose would otherwise vanish without anyone noticing.
const warnAboutDroppedHtml = (postId: string) => () => (tree: MarkdownRoot) => {
  visit(tree, "html", (node: Html) => {
    console.warn(
      `[posts] ${postId}: raw HTML "${node.value}" is dropped from the page, wrap it in backticks to show it`,
    );
  });
};

// The post title is the page's only h1, so the highest heading in a post becomes
// an h2 and the rest keep their position relative to it.
const nestHeadingsUnderTitle = () => (tree: Root) => {
  const headings: Element[] = [];
  visit(tree, "element", (node: Element) => {
    if (/^h[1-6]$/.test(node.tagName)) headings.push(node);
  });

  const headingLevel = (heading: Element) => Number(heading.tagName[1]);
  const highestLevel = Math.min(...headings.map(headingLevel));

  for (const heading of headings) {
    const nestedLevel = headingLevel(heading) - highestLevel + 2;
    heading.tagName = `h${Math.min(nestedLevel, 6)}`;
  }
};

// Local images get their real dimensions so the page doesn't jump as they load.
// All images load lazily, and missing alt text is flagged at build time.
const prepareImages = (postId: string) => () => (tree: Root) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName !== "img") return;

    const src = String(node.properties.src ?? "");
    if (!node.properties.alt) {
      console.warn(`[posts] ${postId}: image ${src} has no alt text`);
    }

    node.properties.loading = "lazy";
    node.properties.decoding = "async";

    const localFile = path.join(publicDir, decodeURI(src));
    if (src.startsWith("/") && fs.existsSync(localFile)) {
      const { width, height } = imageSize(fs.readFileSync(localFile));
      node.properties.width = width;
      node.properties.height = height;
    }
  });
};

// Wrapped in cache() so generateMetadata and the page share one render per request.
export const getPostData = cache(async (id: string) => {
  const fullPath = path.join(postsDir, `${id}.md`);

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, "utf-8");
  } catch (error) {
    // Only a missing file means "no such post", so callers can trigger a real
    // 404. Anything else should surface instead of hiding a broken post.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }

  //Using the gray matter function
  const matterResult = matter(fileContents);

  //Fixing image paths, so they can be viewed in Github .mds more easily
  const fixedContent = matterResult.content.replace(
    /!\[(.*?)\]\(\.\.\/public\/(.*?)\)/g,
    "![$1](/$2)",
  );

  // Thanks for Gemini for solving explaining what each one does!
  const processedContent = await unified()
    .use(remarkParse) // Convert Markdown string to syntax tree (mdast)
    .use(warnAboutDroppedHtml(id))
    .use(remarkRehype) // Convert mdast to HTML syntax tree (hast)
    .use(nestHeadingsUnderTitle)
    .use(prepareImages(id))
    .use(() => (tree: Root) => {
      visit(tree, "element", (node: Element) => {
        // Look for paragraphs that contain images
        if (node.tagName === "p") {
          const imgIndex = node.children.findIndex(
            (child): child is Element =>
              child.type === "element" && child.tagName === "img",
          );

          if (imgIndex !== -1) {
            const imgNode = node.children[imgIndex] as Element;

            // Look for a following 'em' tag (the caption)
            const emNode = node.children.find(
              (child): child is Element =>
                child.type === "element" && child.tagName === "em",
            );

            // Transform the <p> into a <figure>
            node.tagName = "figure";
            node.properties = {
              ...node.properties,
              style: "text-align:center; margin:1.5rem auto; display:block;",
            };

            // Style the image
            imgNode.properties = {
              ...imgNode.properties,
              style: "display:inline-block;",
            };

            // Transform <em> into <figcaption>
            if (emNode) {
              emNode.tagName = "figcaption";
              emNode.properties = {
                ...emNode.properties,
                style:
                  "color:#9e9e9e; margin-top:0.5rem; font-style:italic; display:block;",
              };
            }
          }
        }
      });
    })
    // Find code blocks and inject highlight.js classes
    .use(rehypeHighlight, {
      languages: { ...common, dockerfile, powershell },
      // highlight.js has no Vue grammar, but xml handles a single-file
      // component's template and its embedded script and style blocks.
      aliases: { dockerfile: "Dockerfile", xml: "vue" },
    })
    .use(rehypeStringify) // Convert hast back to a string of HTML
    .process(fixedContent);

  // The highlighter reports unknown code block languages here
  for (const message of processedContent.messages) {
    console.warn(`[posts] ${id}: ${message.reason}`);
  }

  return {
    id,
    contentHtml: processedContent.toString(),
    ...matterResult.data,
  } as PostData;
});
