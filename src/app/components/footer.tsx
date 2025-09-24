export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Oliver Dimes. Built with <a href="https://nextjs.org" className="hover:text-blue-500 transition-colors duration-200">Next.js</a> and on <a href="https://github.com/effeect/the-blog-project/tree/main" className="hover:text-blue-500 transition-colors duration-200">GitHub</a></p>
        {/* <div className="flex space-x-4 mt-4 md:mt-0">
        </div> */}
      </div>
    </footer>
  );
}