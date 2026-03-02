// We are handling the pagination controls here :
import Link from "next/link";

// Copy of the PaginationControls object but meant for the post navigation
export default function PostControls({
  currentPost,
  currentIndex,
  nextPost,
  prevPost,
  ArrayLength,
}: {
  currentPost: string;
  currentIndex: string;
  nextPost: string;
  prevPost: string;
  ArrayLength: string;
}) {
  return (
    <nav
      className="pagination is-centered mt-6"
      role="navigation"
      aria-label="pagination"
    >
      {nextPost == currentPost ? (
        <Link
          href={`#`}
          className="pagination-previous is-disabled"
          style={{ cursor: "not-allowed", pointerEvents: "none" }}
        >
          Next Post
        </Link>
      ) : (
        <Link href={`/posts/${nextPost}`} className="pagination-previous">
          Next Post
        </Link>
      )}
      {prevPost == currentPost ? (
        <Link
          href={`#`}
          className="pagination-next is-disabled"
          style={{ cursor: "not-allowed", pointerEvents: "none" }}
        >
          Previous Post
        </Link>
      ) : (
        <Link href={`/posts/${prevPost}`} className="pagination-next">
          Previous Post
        </Link>
      )}

      <ul className="pagination-list">
        <li>
          <span className="pagination-link is-current">
            Post {currentIndex} of {ArrayLength}
          </span>
        </li>
      </ul>
    </nav>
  );
}
