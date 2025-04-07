// app/MotivationApp/page.jsx
// This is provided in only Korean for now.
"use client";

import React from "react";
import Link from "next/link";
import ThemeChanger from "../components/Darkmode-btn";
import { useLang } from "../components/LanguageProvider";
import "../globals.css";
import dynamic from 'next/dynamic';
import TableOfContents from '../components/TableOfContents';
import { useState, useEffect } from 'react';

import IntroSection from './posts/IntroSection';
import AuthSection from './posts/AuthSection';
import DBSection from './posts/DBSection';
import DashboardSection from './posts/DashboardSection';
import CalendarSection from './posts/CalendarSection';
import MissionProfileFutureSection from './posts/MissionProfileFutureSection';


const CodeMirrorEditor = dynamic(() => import('../components/CodeMirrorEditor'), {
  ssr: false,
});

const allContents = [
  {
    title: "프로젝트 개요",
    content: [
      { header: "The Motivation App이란?" },   // section-0-1
      { header: "핵심 기능 소개" },            // section-0-2
      { header: "사용된 기술" },              // section-0-3
      { header: "디렉토리 구조" },                 // section-0-4
      { header: "API 구조" }                 // section-0-5
    ]
  },
  {
    title: "NextAuth - 인증 시스템",
    content: [
      { header: "NextAuth 소개" },             // section-1-0
      { header: "Provider 설정" },             // section-1-1
      { header: "Layout에 Provider 적용" },   // section-1-2
      { header: "[...nextauth] 라우트 구성" }, // section-1-3
      { header: "인증 로직 분리 (lib/auth.ts)" }, // section-1-4
      { header: "사용자 세션 타입 확장" },       // section-1-5
      { header: "인증 미들웨어 구성" }       // section-1-6
    ]
  },
  {
    title: "데이터베이스",
    content: [
      { header: "데이터베이스 개요" },             // section-2-0
      { header: "Prisma" },             // section-2-1
      { header: "Prisma Schema" },   // section-2-2
      { header: "Prisma 세팅 및 명령어" }, // section-2-3
      { header: "DB 설계 의도 및 반복 구조 처리"} // section-2-4
    ]
  },
  {
    title: "대시보드",
    content: [
      { header: "미션 현황 및 조작" },              // section-3-0
      { header: "사용된 API 구조 개요" },           // section-3-1
      { header: "API 호출 및 동작 원리" },          // section-3-2
      { header: "보안 처리 및 취약점 방지" }        // section-3-3
    ]
  },
  {
    title: "캘린더 기능",
    content: [
      { header: "캘린더 기능 설명" },            // section-4-0
      { header: "로그 기반 시각화" },         // section-4-1
      { header: "날짜 클릭 시 모달 표시" },   // section-4-2
      { header: "Dashboard에서의 props 전달 구조" } // section-4-3
    ]
  },
  {
    title: "미션 & 프로필 + 개선 방향",
    content: [
      { header: "Missions 페이지" },     // section-5-0
      { header: "Profile 페이지" },      // section-5-1
      { header: "향후 개선 사항" }        // section-5-2
    ]
  }
];





export default function MotivationApp() {
  const { lang, changeLang } = useLang();
  const [activeSection, setActiveSection] = useState({ contentIndex: 0, sectionIndex: 0 });

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      allContents.forEach((content, contentIdx) => {
        content.content.forEach((section, sectionIdx) => {
          const el = document.getElementById(`section-${contentIdx}-${sectionIdx}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (!found && rect.top < window.innerHeight / 2 && rect.bottom > 0) {
              setActiveSection({ contentIndex: contentIdx, sectionIndex: sectionIdx });
              found = true;
            }
          }
        });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (contentIndex, sectionIndex) => {
    setActiveSection({ contentIndex, sectionIndex });
  };

  return (
    <>
      {/* Header */}
      <header className="top-0 w-full z-50 shadow-md backdrop-blur-md bg-white/70 dark:bg-[#121212]/70 mb-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center p-4">
          <Link
            href="/#projects"
            className="font-medium self-start ml-5 md:ml-0 md:self-center mb-2 md:mb-0"
          >
            <span className="text-2xl text-black dark:text-white">
              Pilkyu Han
            </span>
          </Link>
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
        {/* Table of Contents */}
        <TableOfContents
          title="목차"
          sections={allContents}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
        {/* Contents */}
        <div className="blogBody">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold mb-8 font-gowun">The Motivation App Documentation</h1>
            <a
              href="https://motiv-app-ivory.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-sm sm:text-base font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-500 transition-colors duration-200"
            >
              <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 ease-in-out">
                Try the Motivation App →
              </span>
            </a>
          </div>

          <IntroSection />
          <AuthSection />
          <DBSection />
          <DashboardSection />
          <CalendarSection />
          <MissionProfileFutureSection />

        </div>
      </div>
    </>
  );
}