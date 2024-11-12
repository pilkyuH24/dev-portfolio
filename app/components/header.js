"use client";

import Link from "next/link";
import ThemeChanger from "./darkmode-btn";

export default function Header() {
  return (
    <header className="header">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
        {/* Logo */}
        <Link href="/" className="flex title-font font-medium items-center mb-4 md:mb-0">
          <span className="ml-3 text-xl text-black dark:text-white">Pilkyu Han</span>
        </Link>

        {/* Navigation Links */}
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/about-me" className="mr-5 text-black dark:text-white">About Me</Link>
          <Link href="/skills" className="mr-5 text-black dark:text-white">Skills</Link>
          <Link href="/projects" className="mr-5 text-black dark:text-white">Projects</Link>
          <Link href="/contacts" className="mr-5 text-black dark:text-white">Contacts</Link>
        </nav>

        {/* Dark Mode Toggle Button */}
        <div className="ml-5">
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
}
