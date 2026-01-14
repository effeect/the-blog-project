import { notFound } from "next/navigation";
import { getAllPostIds, getPostData } from "@/app/lib/posts";
import Date from "@/app/lib/date";
import "highlight.js/styles/github-dark.css";
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

  console.log(post.previewImage);

  return {
    metadataBase: new URL("https://oliverdimes.dev"),
    alternates: {
      canonical: "/",
    },
    title: `oliverdimes.dev - ${post.title}`,
    description: post.summary ?? `A post about ${post.tags?.join(", ")}`,
    keywords: post.tags?.join(", ") ?? "Blog post by Oliver",
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
        <header className="mb-6">
          <h1 className="title is-1">{postData.title}</h1>
          <h2 className="subtitle is-4 mt-2">
            {postData.summary ?? "No Summary Available, sorry!"}
          </h2>

          <div className="is-flex is-align-items-center is-size-7 ">
            <span className="mr-2">
              Posted on{" "}
              <strong>
                <Date dateString={postData.date} />
              </strong>
            </span>
          </div>

          {postData.tags?.length && (
            <div className="tags mt-4">
              {postData.tags.map((tag) => (
                <span key={tag} className="tag is-link is-rounded is-light">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <hr className="has-background-grey-dark" />

        {/* Post Content Section */}
        {/* The "content" class is Bulma's equivalent to Tailwind's "prose" */}
        <div
          className="content is-medium"
          style={{ minHeight: "500px" }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </section>
  );
}
