"use client";
//Simple Navbar component for the blog/portfolio website
import Link from "next/link";
import styles from "./navbar.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons"; //Special thanks to https://codesandbox.io/p/sandbox/link-hover-t2rxxv?file=%2Findex.html%3A11%2C1-22%2C11&from-embed for the hover effect inspiration
export default function Navbar() {
  const closeMenu = () => {
    setIsActive(false);
  };
  // Define the states above
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <nav className={`navbar`} role="navigation" aria-label="main navigation">
        <div className="container my-1">
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
              <Link
                href="/posts"
                className={`navbar-item ${styles.noHover} mr-4 ${styles.itemHover}`}
                onClick={closeMenu}
              >
                <strong>Posts</strong>
              </Link>
              {/* Github Icon */}
              <Link
                href="https://github.com/effeect"
                className={`navbar-item ${styles.noHover} ${styles.itemHover_white}`}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </span>
              </Link>
              {/* LinkedIn Icon */}
              <Link
                href="https://www.linkedin.com/in/oliver-dimes-793b31194/"
                className={`navbar-item ${styles.noHover} ${styles.itemHover_linkedin}`}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </span>
              </Link>
              {/* Bluesky Icon*/}
              <Link
                href="https://bsky.app/profile/effeect.bsky.social"
                className={`navbar-item ${styles.noHover} ${styles.itemHover}`}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faBluesky} size="lg" />
                </span>
              </Link>
              {/* Email Icon */}
              <Link
                href="mailto:effeect-contact@pm.me"
                className={`navbar-item ${styles.noHover}`}
              >
                <button className={`button is-primary`}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* <div className="mb-20"></div> */}
    </>
  );
}
