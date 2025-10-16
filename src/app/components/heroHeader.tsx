// For the home page
import styles from "../styles/heroHeader.module.css";
import PostsList from "./postsList";
import BackgroundImages from "./backgroundImages";

export default function HeroHeader() {
  return (
    <section
      className={`${styles.animateGradient} min-h-screen bg-gray-100 dark:bg-gray-900 py-20 px-6 text-center justify-center flex`}
    >
      <BackgroundImages>
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              This blog contains a collection of my ongoing projects and
              programming stuff I'm working on/interested in.
            </p>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Feel free to check out the posts!
            </p>
          </div>

          {/* Right Column */}
          <div className="text-gray-800 dark:text-gray-200">
            {/* You can replace this with an image, buttons, or anything else */}
            <PostsList />
          </div>
        </div>
      </BackgroundImages>
    </section>
  );
}
