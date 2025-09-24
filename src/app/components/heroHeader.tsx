// For the home page
import styles from "../styles/heroHeader.module.css"

export default function HeroHeader() {
  return (
    <section className={`${styles.animateGradient} min-h-[50vh] bg-gray-100 dark:bg-gray-900 py-20 px-6 text-center justify-center flex`}>
      <div className="mx-auto py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          My Name is Oliver Dimes
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Welcome to my Portfolio/Blog, feel free to explore!
        </p>
      </div>
    </section>
  );
}