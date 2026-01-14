"use client";
//Simple Navbar component for the blog/portfolio website
import Link from "next/link";
import styles from "./navbar.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons";
//Special thanks to https://codesandbox.io/p/sandbox/link-hover-t2rxxv?file=%2Findex.html%3A11%2C1-22%2C11&from-embed for the hover effect inspiration
export default function Navbar() {
  const closeMenu = () => {
    setIsActive(false);
  };
  // Define States
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <nav className={`navbar`} role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link
              href="/"
              className={`navbar-item ${styles.logoText}`}
              onClick={closeMenu}
            >
              oliverdimes.dev
            </Link>

            <button
              onClick={() => setIsActive(!isActive)}
              className={`navbar-burger ${isActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
            >
              {/* Seem to need four lines for this? */}
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
            <div className="navbar-start">{/* 2. Text Link 1 */}</div>

            <div className="navbar-end">
              <Link href="/posts" className="navbar-item" onClick={closeMenu}>
                Posts
              </Link>
              {/* 3. Text Link 2 */}
              <Link href="/about" className="navbar-item" onClick={closeMenu}>
                About
              </Link>
              {/* 4. Icon Link 1 (GitHub) */}
              <a href="https://github.com/effeect" className="navbar-item">
                <span className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/oliver-dimes-793b31194/"
                className="navbar-item"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
              </a>
              <a
                href="https://bsky.app/profile/effeect.bsky.social"
                className="navbar-item"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faBluesky} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* <div className="mb-20"></div> */}
    </>
  );
}
