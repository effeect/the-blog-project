import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./contactButtons.module.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons";

const ContactButtons = () => {
  return (
    <div className="buttons">
      {/* Github Icon */}
      <Link
        href="https://github.com/effeect"
        className={`button ${styles.noHover} ${styles.itemHover_white}`}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </span>
        <span>GitHub</span>
      </Link>
      {/* LinkedIn Icon */}
      <Link
        href="https://www.linkedin.com/in/oliver-dimes-793b31194/"
        className={`button ${styles.noHover} ${styles.itemHover_linkedin}`}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </span>
        <span>LinkedIn</span>
      </Link>
      {/* Bluesky Icon*/}
      <Link
        href="https://bsky.app/profile/effeect.bsky.social"
        className={`button ${styles.noHover} ${styles.itemHover}`}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faBluesky} size="lg" />
        </span>
        <span>Bluesky</span>
      </Link>
      {/* Email Icon */}
      <Link
        href="mailto:effeect-contact@pm.me"
        className={`button ${styles.noHover} ${styles.itemHover_white}`}
      >
        <span className="icon">
          {" "}
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </span>
        <span>Mail Me!</span>
      </Link>
    </div>
  );
};

export default ContactButtons;
