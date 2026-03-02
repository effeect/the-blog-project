import React from "react";
import ContactButtons from "../components/atoms/contactButtons/contactButtons";
// Creates metadata for the HomePage
// Is a static homepage so doesn't need any specific updating
export const metadata = {
  metadataBase: new URL("https://oliverdimes.dev"),
  alternates: {
    canonical: "/",
  },
  title: `oliverdimes.dev - About Me`,
  description: `About Me - Personal Blog/Portfolio for Oliver Dimes, development stuff, personal projects and more`,
  keywords: "Article, About Me",
  openGraph: {
    images: ["/default_preview.png"],
  },
};

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container is-max-desktop">
          <div className="content is-medium" style={{ minHeight: "500px" }}>
            <h1 className="title">About Me</h1>
            <p className="mb-2">
              <strong>Hello there!</strong>, welcome to my personal blog and
              portfolio site where I tend to host my thoughts and development
              process for some of my personal projects that I like to work on in
              my spare time. There is quite a huge variety of content on this
              site, from stuff with frontend development to backend development
              and even some automation stuff I work on from time to time.
            </p>
            <p className="mb-2">
              In terms of my background, I am a software developer from the
              United Kingdom. Currently residing in Tokyo on a working holiday
              visa and during my stay, I have been doing lots of language study
              and work on my personal projects that I have always wanted to do
              such learning more about Next.js and React. Fun fact, this very
              website is actually built on Next.js and is hosted on Github which
              is very neat.
            </p>
            <p className="mb-2">
              Programming wise, I am interested in a wide variety of things but
              I have been spending the most time recently looking at Next.js,
              Node.js (with express.js), Python, MicroPython and also some basic
              React UI component development. I have quite extensive knowledge
              of containerization and have been using Docker for a long time now
              and try to develop most of my stuff in the context of using it in
              a Docker container which is a good thing to do
            </p>
            <p className="mb-2">
              If you want to get in touch with me, you can contact me with the
              following contact links!
            </p>
          </div>
          <ContactButtons />
        </div>
      </section>
    </>
  );
}
