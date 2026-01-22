import { notFound } from "next/navigation";
import { getAllPostIds, getPostData } from "@/app/lib/posts";
import "highlight.js/styles/github-dark.css";
import ArticleHeader from "@/app/components/atoms/ArticleHeader/ArticleHeader";
// Define the post data type for safe use
type PostData = {
  id: string;
  date: string;
  title: string;
  previewImage?: string;
  tags?: string[];
  summary?: string; // Added summary for metadata type safety
  contentHtml?: string;
};

export async function generateStaticParams() {
  return getAllPostIds();
}

// Creates metadata, useful for social media like bsky/twitter (rip twitter)
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const post = (await getPostData(id)) as PostData;

  if (!post) return { title: "Post Not Found" };

  // Setting a default preview image if none is provided
  if (!post.previewImage) {
    post.previewImage = "/default-preview.png";
  }

  return {
    metadataBase: new URL("https://oliverdimes.dev"),
    alternates: {
      canonical: "/",
    },
    title: `oliverdimes.dev - ${post.title}`,
    description: post.summary ?? `A post about ${post.tags?.join(", ")}`,
    keywords: post.tags?.join(", ") ?? "Blog post by Oliver Dimes",
    openGraph: {
      images: [post.previewImage],
    },
  };
}

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const postData = (await getPostData(id)) as PostData;

  if (!postData || !postData.contentHtml) return notFound();
  return (
    <section className="section">
      <div className="container is-max-desktop">
        {/* Title and Date Section */}
        <ArticleHeader postData={postData} />

        <hr className="has-background-grey-dark" />

        {/* Post Content Section */}
        <div
          className="content is-medium"
          style={{ minHeight: "500px" }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </section>
  );
}
