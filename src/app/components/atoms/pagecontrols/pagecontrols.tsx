// We are handling the pagination controls here :
import Link from "next/link";
// TODO: Need to make it so the disabled buttons don't work as I get the impression it is going to cause a lot of spam
export default function PageControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <nav
      className="pagination is-centered mt-6"
      role="navigation"
      aria-label="pagination"
    >
      <Link
        href={currentPage > 1 ? `/posts?page=${currentPage - 1}` : "#"}
        className={`pagination-previous ${
          currentPage <= 1 ? "is-disabled" : ""
        }`}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>
      <Link
        href={currentPage < totalPages ? `/posts?page=${currentPage + 1}` : "#"}
        className={`pagination-next ${
          currentPage >= totalPages ? "is-disabled" : ""
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next page
      </Link>

      <ul className="pagination-list">
        <li>
          <span className="pagination-link is-current">
            {currentPage} of {totalPages}
          </span>
        </li>
      </ul>
    </nav>
  );
}
