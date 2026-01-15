// This component fetches and displays a list of blog posts with links to individual post pages.
import { getSortedPosts } from "@/app/lib/posts";
import Link from "next/link";
import Date from "@/app/lib/date";

type PostData = {
  id: string;
  date: string;
  title: string;
};

// This component is meant for the homepage to show the latest
export default function LatestPostList() {
  // Fetching sorted posts data for the list
  const allPostsData = getSortedPosts() as PostData[];
  // Only showing the first 5 posts on the main page
  const displayedPosts = allPostsData.slice(0, 5);
  return (
    <>
      <div className="container is-max-desktop px-4 py-4">
        {/* Custom tinted box */}
        <div
          className="box has-text-white"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h2
            className="title is-4 has-text-white mb-5 pb-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}
          >
            Latest Posts
          </h2>

          <ul className="block">
            {displayedPosts.map(({ id, date, title }) => (
              <li key={id} className="post-item-wrapper mb-2">
                <Link
                  href={`/posts/${id}`}
                  className="is-block p-4 rounded-transition"
                >
                  <h3 className="subtitle is-5 has-text-white mb-1 is-underlined-hover">
                    {title}
                  </h3>
                  <div className="is-size-7 has-text-grey-light">
                    <span>Posted on </span>
                    <Date dateString={date} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
