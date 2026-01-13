// This page will show all posts in a list format with links to each post
// Using getSortedPosts function from lib/posts.ts to get the data
import Link from "next/link";
import Date from "../lib/date";

// Custom Imports
import { getSortedPosts } from "../lib/posts";
import { se } from "date-fns/locale";

type PostData = {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  summary?: string;
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const allPostsData = getSortedPosts() as PostData[];

  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const postsPerPage = 5;
  const totalPosts = allPostsData.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPostsData.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(currentPosts);
  return (
    <>
      <title>oliverdimes.dev - Posts</title>
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
          {" "}
          All Posts :{" "}
        </h2>
        <ul className="space-y-4">
          {/* Below will loop through the array and create a line item and link item along with it*/}
          {currentPosts.map(({ id, date, title, tags, summary }) => (
            <li
              className="hover:bg-gray-500 transition-colors rounded-md p-4"
              key={id}
            >
              <Link href={`/posts/${id}`}>
                {" "}
                <h3 className="text-lg font-medium hover:underline">{title}</h3>
              </Link>
              <label className="text-sm "> {summary}</label>
              <br />
              <label className="text-sm italic ">
                Posted on <Date dateString={date}></Date>
              </label>
              {tags && tags.length > 0 && (
                <div className="mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-700">
          {currentPage > 1 ? (
            <Link
              href={`/posts?page=${currentPage - 1}`}
              className="px-5 py-2 bg-white text-black rounded font-medium hover:bg-gray-200"
            >
              ← Previous
            </Link>
          ) : (
            <Link
              href={``}
              className="px-5 py-2 bg-white text-black rounded font-medium hover:bg-gray-200"
            >
              ← Previous
            </Link>
          )}

          <p className="text-sm">
            {currentPage} of {totalPages}
          </p>

          {currentPage < totalPages ? (
            <Link
              href={`/posts?page=${currentPage + 1}`}
              className="px-5 py-2 bg-white text-black rounded font-medium hover:bg-gray-200"
            >
              Next →
            </Link>
          ) : (
            <Link
              href={``}
              className="px-5 py-2 bg-white text-black rounded font-medium hover:bg-gray-200"
            >
              Next →
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
