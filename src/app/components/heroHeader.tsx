// For the home page
import Image from "next/image";
import PostsList from "./postsList";
import BackgroundImages from "./backgroundImages";
import Link from "next/link";

// Loading Images links from above
export default function HeroHeader({ images }: { images: string[] }) {
  return (
    <section className="hero is-fullheight is-relative">
      <BackgroundImages images={images}>
        <div className="hero-body">
          <div className="container has-text-centered">
            {/* 1. Circular Profile Image */}
            <div className="is-flex is-justify-content-center mb-5">
              <figure className="image is-128x128">
                <Image
                  src="/profile.jpeg"
                  alt="Oliver's profile"
                  width={128}
                  height={128}
                  className="is-rounded"
                  style={{
                    border: "4px solid white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    objectFit: "cover",
                  }}
                />
              </figure>
            </div>

            {/* 2. Heading with Hover Effect */}
            <h1 className="title is-1 has-text-white mb-6 animate-hover">
              Welcome to my Blog!
            </h1>

            {/* 3. Subtitle */}
            <p className="subtitle is-4 has-text-grey-lighter is-max-desktop mx-auto mb-6">
              Explore my latest projects, thoughts on development, and technical
              deep dives.
            </p>

            {/* 4. Buttons */}
            <div className="buttons is-centered py-4">
              <Link href="/posts" className="button is-link is-large">
                <strong>View Posts</strong>
              </Link>
              <Link href="/about" className="button is-light is-large">
                About Me
              </Link>
            </div>

            {/* 5. Content List */}
            <div className="mt-6">
              <PostsList />
            </div>
          </div>
        </div>
      </BackgroundImages>

      {/* Custom CSS for the scale effect */}
    </section>
  );
}
