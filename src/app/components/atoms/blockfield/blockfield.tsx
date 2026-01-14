import React from "react";
import Link from "next/link";
import Date from "@/app/lib/date";
import styles from "./blockfield.module.css";
// Should export the type outside tbh
type PostData = {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  summary?: string;
};

export default function BlockField({
  currentPosts,
}: {
  currentPosts: PostData[];
}) {
  //   console.log(currentPosts);
  return (
    <div className="block">
      {currentPosts.map(({ id, date, title, tags, summary }) => (
        <div key={id} className={`box mb-5 ${styles.postBox}`}>
          <Link href={`/posts/${id}`} className="is-block">
            <h3 className={`title is-4 is-marginless ${styles.hoverUnderline}`}>
              {title}
            </h3>
          </Link>

          <p className="is-size-6 mt-2 ">{summary}</p>

          <div className="is-flex is-align-items-center mt-3 is-size-7 ">
            <span className="mr-1">Posted on</span>
            <Date dateString={date} />
          </div>

          {tags && tags.length > 0 && (
            <div className="tags mt-3">
              {tags.map((tag) => (
                <span key={tag} className="tag is-link is-rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
