// Footer component for the bottom of the website, shows up on every page
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content is-justify-content-space-between is-align-items-center has-text-centered">
          <p className="subtitle">
            &copy; {new Date().getFullYear()} Oliver Dimes. Built with{" "}
            <Link href="https://nextjs.org" className="has-text-link">
              Next.js
            </Link>
            ,{" "}
            <Link href="https://bulma.io" className="has-text-link">
              Bulma
            </Link>{" "}
            and{" "}
            <Link
              href="https://github.com/effeect/the-blog-project/tree/main"
              className="has-text-link"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
