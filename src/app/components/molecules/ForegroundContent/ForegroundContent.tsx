import React from "react";
import Link from "next/link";
import LatestPostList from "../../atoms/latestPosts";
import ProfilePic from "../../atoms/ProfilePic/ProfilePic";

const ForegroundContent = () => {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        {/* 1. Circular Profile Image */}
        <ProfilePic />

        <h1 className="title is-1 has-text-white mb-2 animate-hover">
          Welcome to my blog!
        </h1>
        <p className="subtitle is-4 has-text-grey-lighter is-max-desktop mx-auto mb-6">
          Posts about development, personal projects, and more.
        </p>

        <div className="buttons is-centered py-2">
          <Link href="/posts" className="button is-link is-large">
            <strong>View Posts</strong>
          </Link>
          <Link href="/about" className="button is-light is-large">
            About Me
          </Link>
        </div>

        <div className="mt-6">
          <LatestPostList />
        </div>
      </div>
    </div>
  );
};

export default ForegroundContent;
