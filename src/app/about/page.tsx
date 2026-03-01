import React from "react";
export default function About() {
  return (
    <>
      <title>oliverdimes.dev - About Me</title>
      <section className="section">
        <div className="container mt-10 mb-20">
          <div className="container is-max-desktop">
            <h1 className="title">About Me</h1>
            <p className="mb-6">
              <strong>Hello there!</strong>, welcome to my personal blog and
              portfolio site where I tend to host my thoughts and development
              process for some of my personal projects that I like to work on in
              my spare time. There is quite a huge variety of content on this
              site, from stuff with frontend development to backend development
              and even some automation stuff I work on from time to time.
            </p>
            <p className="mb-6">In terms of who I am and my background</p>
            <p className="mb-6">
              If you need to contact me for whatever reason (one of my projects
              is broken or you have a query), contact me via Bluesky or you can
              find my contact info on Github/LinkedIn if you need something a
              bit more concrete. Many Thanks, Let’s go!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
