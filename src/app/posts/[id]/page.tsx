import { notFound } from "next/navigation";
import { getAllPostIds, getPostData } from "@/app/lib/posts";
import { Metadata } from "next";

type PostData = {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  contentHtml?: string;
};

// ✅ Required for dynamic routes
export async function generateStaticParams() {
  return getAllPostIds(); // returns [{ id: "post1" }, { id: "post2" }]
}

// ✅ Metadata function — use inline type
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `oliverdimes.dev - ${post.title}`,
    description: post.tags?.join(", ") ?? "Blog post by Oliver",
  };
}

// ✅ Page component — use inline type
export default async function PostPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.id);
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
