// app/components/Header.jsx
"use client";

import Link from "next/link";
import ThemeChanger from "./Darkmode-btn";
import { useLang } from "./LanguageProvider";
import "../globals.css";


export default function Header() {
  const { lang, changeLang } = useLang();

  return (
    <header className="header">
      <div className="container mx-auto flex flex-col md:flex-row items-center p-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-medium self-start ml-5 md:ml-0 md:self-center mb-2 md:mb-0"
        >
          <span className="text-2xl text-black dark:text-white">
            Pilkyu Han
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="w-full md:w-auto flex justify-center md:ml-auto items-center text-base mt-4 md:mt-0">
          <a href="#about-me" className="mx-2 text-black dark:text-white">
            About Me
          </a>
          <a href="#projects" className="mx-2 text-black dark:text-white">
            Projects
          </a>
          <a href="#skills" className="mx-2 text-black dark:text-white">
            Skills
          </a>
          <a href="#contacts" className="mx-2 text-black dark:text-white">
            Contacts
          </a>
        </nav>

        {/* Dark Mode Toggle & Language Selector */}
        <div className="absolute top-4 right-4 flex items-center space-x-3 md:static md:ml-5">
          <ThemeChanger />
          <div className="flex space-x-1">
            {["en", "ko"].map((code) => (
              <button
                key={code}
                onClick={() => changeLang(code)}
                className={`text-2xl px-2 rounded-md transition-all border ${
                  lang === code
                    ? "border-gray-500 dark:border-white"
                    : "border-transparent"
                }`}
                title={code === "en" ? "English" : "Korean"}
              >
                {code === "en" ? "🇺🇸" : "🇰🇷"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
