"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
//Simple Navbar component for the blog/portfolio website
//Special thanks to https://codesandbox.io/p/sandbox/link-hover-t2rxxv?file=%2Findex.html%3A11%2C1-22%2C11&from-embed for the hover effect inspiration
export default function Navbar() {
  // Define States
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl hover:text-blue-600 text-black hover:scale-110 transition-transform duration-300">
            <Link href="/">oliverdimes.dev</Link>
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
              } absolute top-full left-0 w-full bg-white shadow-md md:static md:flex md:space-x-6 md:bg-transparent md:shadow-none text-gray-700 font-medium md:w-auto`}
            >
              {[
                { href: "/posts", label: "Posts" },
                { href: "/about", label: "About" },
                {
                  href: "https://www.linkedin.com/in/oliver-dimes-793b31194/",
                  label: "LinkedIn",
                  icon: "/icons/linkedin.svg",
                },
                {
                  href: "https://bsky.app/profile/effeect.bsky.social",
                  label: "Bluesky",
                  icon: "/icons/bsky.svg",
                },
              ].map(({ href, label, icon }) => (
                <li
                  key={label}
                  className="group relative cursor-pointer px-4 py-2 md:px-0 md:py-0"
                >
                  <Link
                    href={href}
                    className="items-center justify-center inline-flex transition-colors duration-300 hover:text-indigo-600"
                  >
                    {/* Show label on mobile (hamburger mode) */}
                    <span className="md:hidden">{icon && label}</span>

                    {/* Show icon on desktop */}
                    {icon && (
                      <Image
                        src={icon}
                        alt={`${label} icon`}
                        width={16}
                        height={16}
                        className="hidden md:inline-block hover:scale-150 transition-transform py-0
                        duration-300"
                      />
                    )}

                    {/* Show label if no icon, always */}
                    {!icon && <span>{label}</span>}
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
