// For the home page
import Image from "next/image";
import PostsList from "./postsList";
import BackgroundImages from "./backgroundImages";
import Link from "next/link";

export default function HeroHeader({ images }: { images: string[] }) {
  return (
    <section className="relative overflow-hidden">
      <BackgroundImages images={images}>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          {/* Circular Profile Image */}
          <Image
            src="/profile.jpeg"
            alt="Oliver's profile"
            width={128}
            height={128}
            loading="lazy"
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="w-32 h-2 mb-6 relative"></div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to my Blog!
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Explore my latest projects, thoughts on development, and technical
            deep dives.
          </p>
          <div className="flex gap-4">
            <Link
              href="/posts"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              View Posts
            </Link>
            <Link
              href="/about"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* You can replace this with an image, buttons, or anything else */}
      </BackgroundImages>
    </section>
  );
}
