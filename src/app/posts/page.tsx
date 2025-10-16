// This page will show all posts in a list format with links to each post
// Using getSortedPosts function from lib/posts.ts to get the data
import Link from "next/link";
import Date from "../lib/date";

// Custom Imports
import { getSortedPosts } from "../lib/posts";

type PostData = {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  summary?: string;
};

export default function PostsPage() {
  const allPostsData = getSortedPosts() as PostData[];

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
          {allPostsData.map(({ id, date, title, tags, summary }) => (
            <li
              className="hover:bg-gray-500 transition-colors rounded-md p-4"
              key={id}
            >
              <Link href={`/posts/${id}`}>
                {" "}
                <h3 className="text-lg font-medium text-white hover:underline">
                  {title}
                </h3>
              </Link>
              <label className="text-sm text-gray-300"> {summary}</label>
              <br />
              <label className="text-sm italic text-gray-300">
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
      </section>
    </>
  );
}
