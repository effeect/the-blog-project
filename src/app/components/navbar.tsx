"use client";
import Link from "next/link";
import { useState } from "react";

//Simple Navbar component for the blog/portfolio website
//Special thanks to https://codesandbox.io/p/sandbox/link-hover-t2rxxv?file=%2Findex.html%3A11%2C1-22%2C11&from-embed for the hover effect inspiration
export default function Navbar() {
  // Define States
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold hover:text-blue-600 text-black">
            <Link href="/">Oliver J Dimes</Link>
          </div>
          {/* Hamburger Icon */}
          <div className="flex items-center">
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Menu */}

            <ul
              className={`${
                menuOpen ? "block" : "hidden"
              } absolute top-full left-0 w-full bg-white shadow-md md:static md:flex md:space-x-6 md:bg-transparent md:shadow-none text-gray-700 font-medium`}
            >
              {[
                { href: "/posts", label: "Posts" },
                { href: "/about", label: "About Me" },
                {
                  href: "https://www.linkedin.com/in/oliver-dimes-793b31194/",
                  label: "Linkedin",
                },
                {
                  href: "https://bsky.app/profile/effeect.bsky.social",
                  label: "Bluesky",
                },
              ].map(({ href, label }) => (
                <li
                  key={label}
                  className="group relative w-max cursor-pointer px-4 py-2 md:px-0 md:py-0"
                >
                  <Link
                    href={href}
                    className="transition-colors duration-300 hover:text-indigo-600"
                  >
                    {label}
                  </Link>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
