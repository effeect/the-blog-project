import { notFound } from "next/navigation";
import { getAllPostIds, getPostData } from "@/app/lib/posts";
import { Metadata } from "next";

// ✅ Type definition for PostData (used only to suppress the previous ESLint warning,
//    but you should use it for type safety of post variables if possible)
type PostData = {
  id: string;
  date: string;
  title: string;
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
  console.log(params);
  const id = params.id;
  const post = (await getPostData(id)) as PostData;

  if (!post) return { title: "Post Not Found" };

  return {
    metadataBase: new URL("https://oliverdimes.dev"),
    alternates: {
      canonical: "/",
    },
    title: `oliverdimes.dev - ${post.title}`,
    description: post.summary ?? `A post about ${post.tags?.join(", ")}`,
    keywords: post.tags?.join(", ") ?? "Blog post by Oliver",
    openGraph: {
      images: ["/assets/the-frame-extraction-project/website.png"],
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
    <div className="max-w-5xl mx-auto px-4 py-8 text-white-800">
      <h1 className="text-5xl font-bold mb-6">{postData.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Posted on {postData.date}</p>
      {postData.tags?.length && (
        <div className="mt-2">
          {postData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2 hover:bg-amber-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <hr className="my-6 border-gray-300" />
      <div
        className="prose dark:prose-invert min-h-[500px] max-w-5xl"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </div>
  );
}
