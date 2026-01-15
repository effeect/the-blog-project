import React from "react";
import Date from "../../atoms/date/date";
import { PostData } from "@/app/types/PostData.type";

const ArticleHeader = ({ postData }: { postData: PostData }) => {
  return (
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
  );
};

export default ArticleHeader;
