// Footer component for the bottom of the website, shows up on every page
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p className="subtitle">
          &copy; {new Date().getFullYear()} Written by Oliver Dimes. Built with{" "}
          <Link href="https://nextjs.org" className="has-text-link">
            Next.js
          </Link>
          ,{" "}
          <Link href="https://bulma.io" className="has-text-link">
            Bulma CSS
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
    </footer>
  );
}
