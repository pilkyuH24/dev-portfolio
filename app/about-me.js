"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function AboutMe() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load the dotlottie-player script for the animation
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto flex flex-col-reverse  lg:flex-row items-center gap-8 px-5 py-16 lg:py-36">
      {/* Text Section */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 space-y-6">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-10 mt-14">
          Hello, I&apos;m Pilkyu Han
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
          I&apos;m Pilkyu Han, originally from South Korea and a graduate of UC
          Berkeley with a degree in Electrical Engineering and Computer Science.
          I&apos;m passionate about using technology to solve real-world
          problems and create practical solutions.
        </p>

        <ol className="text-2xl space-y-2 py-10">
          <li>🚀 - Passionate about embracing new technologies </li>
          <li>🎨 - Enjoys creating innovative and fun projects</li>
          <li>☕ - Coffee lover</li>
        </ol>

        <div className="flex justify-center lg:justify-start">
          <a href="#projects">
            <button className="relative mt-2 inline-flex items-center justify-center overflow-hidden text-white bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-900 border-0 py-2 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-75 blur-lg rounded-lg"></span>
              <span className="relative">View Projects</span>
            </button>
          </a>
        </div>
      </div>

      {/* Animation Section */}
      <div className="flex justify-center items-center lg:w-1/2">
        <dotlottie-player
          src="https://lottie.host/31d836bc-2cb3-4344-bb27-3dd5640e85bc/y9cvpHwaQA.json"
          background="transparent"
          speed="1"
          style={{ width: "80%", height: "80%" }}
          direction="1"
          mode="normal"
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
}
