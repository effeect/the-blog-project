import Link from 'next/link';

//Simple Navbar component for the blog/portfolio website

export default function Navbar() {
    return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600"><Link href="/">Oliver J Dimes</Link></div>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li><Link href="/posts">Posts</Link></li>
            <li><Link href="/about">About Me</Link></li>
            <li><Link href="https://www.linkedin.com/in/oliver-dimes-793b31194/">Linkedin</Link></li>
            <li><Link href="https://bsky.app/profile/effeect.bsky.social">Bluesky</Link></li>
          </ul>
        </div>
      </nav>
      </>
      );
  }