// app/MotivationApp/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import ThemeChanger from "../components/Darkmode-btn";
import { useLang } from "../components/LanguageProvider";
import "../globals.css";
import dynamic from 'next/dynamic';

const CodeMirrorEditor = dynamic(() => import('../components/CodeMirrorEditor'), {
  ssr: false,
});

const sampleCode = `
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Pilkyu");
`;


export default function MyPage() {
  const { lang, changeLang } = useLang();

  return (
    <>
      <header className="top-0 w-full z-50 shadow-md backdrop-blur-md bg-white/70 dark:bg-[#121212]/70 mb-24">
        <div className="container mx-auto flex flex-col md:flex-row items-center p-4">
          {/* Logo */}
          <Link
            href="/#projects"
            className="font-medium self-start ml-5 md:ml-0 md:self-center mb-2 md:mb-0"
          >
            <span className="text-2xl text-black dark:text-white">
              Pilkyu Han
            </span>
          </Link>


          {/* Dark Mode Toggle & Language Selector */}
          <div className="absolute top-4 right-4 flex items-center space-x-3 md:ml-5">
            <ThemeChanger />
            <div className="flex space-x-1">
              {["en", "ko"].map((code) => (
                <button
                  key={code}
                  onClick={() => changeLang(code)}
                  className={`text-2xl px-2 rounded-md transition-all border ${lang === code
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

      <div className="blogContainer">
        <div className="blogBody">
          <h1 className="text-4xl font-bold mb-4 font-zain">My Page</h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 font-zain">
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
            This is a new page. This is a new page. This is a new page. This is a new page.
          </p>
          <CodeMirrorEditor code={sampleCode} />
        </div>
      </div>
    </>
  );
}
