"use client";

import Link from "next/link";
import ThemeChanger from "./darkmode-btn";

export default function Header() {
  return (
    <header className="header">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex title-font font-medium items-center mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl text-black dark:text-white">
            Pilkyu Han
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a
            href="#about-me"
            className="mr-5 text-black dark:text-white cursor-pointer"
          >
            About Me
          </a>
          <a
            href="#skills"
            className="mr-5 text-black dark:text-white cursor-pointer"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="mr-5 text-black dark:text-white cursor-pointer"
          >
            Projects
          </a>
          <a
            href="#contacts"
            className="mr-5 text-black dark:text-white cursor-pointer"
          >
            Contacts
          </a>
        </nav>

        {/* Dark Mode Toggle Button */}
        <div className="ml-5">
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
}
