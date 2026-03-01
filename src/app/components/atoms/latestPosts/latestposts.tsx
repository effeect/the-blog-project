// This component fetches and displays a list of blog posts with links to individual post pages.
import { getSortedPosts } from "@/app/lib/posts";
import Link from "next/link";
import Date from "@/app/lib/date";
import styles from "./latestPosts.module.css";

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
        <div className={`box ${styles.boxBlur}`}>
          <h2 className="title is-3 ">Latest Posts</h2>
          <p className="subtitle is-5 mb-4">
            <Link href="/posts" className="has-text-link">
              View All
            </Link>
          </p>

          <ul className="block">
            {displayedPosts.map(({ id, date, title }) => (
              <li key={id} className={`mb-2`}>
                <Link
                  href={`/posts/${id}`}
                  className={`${styles.itemHover} is-block p-4`}
                >
                  <h3 className="title is-5 mb-1">{title}</h3>
                  <h3 className="subtitle is-7">
                    <span>Posted on </span>
                    <Date dateString={date} />
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
