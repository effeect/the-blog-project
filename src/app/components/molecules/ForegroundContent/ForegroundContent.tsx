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

        {/* Title and Subtitle */}
        <h1 className="title is-2 mb-2">oliverdimes.dev</h1>
        <p className="subtitle is-3 is-max-desktop mx-auto mb-2">
          Posts and projects about my development and more!
        </p>
        {/* Buttons at the center here*/}
        {/* <div className="buttons is-centered py-2">
          <Link href="/posts" className="button is-large">
            All Posts
          </Link>
          <Link href="/about" className="button is-large">
            About Me
          </Link>
        </div> */}
        {/* Latest posts section */}
        <div className="mt-4"></div>
        <LatestPostList />
        <div className="mt-4"></div>
      </div>
    </div>
  );
};

export default ForegroundContent;
