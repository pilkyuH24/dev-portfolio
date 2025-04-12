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

import IntroSectionV2 from './postV2/IntroSectionV2';
import AuthSectionV2 from './postV2/AuthSectionV2';
import DBSectionV2 from './postV2/DBSectionV2';
import DashboardSectionV2 from './postV2/DashboardSectionV2';
import CalendarSectionV2 from './postV2/CalendarSectionV2';
import MissionsSectionV2 from './postV2/MissionsSectionV2';
import ProfileSectionV2 from './postV2/ProfileSectionV2';
import CacheSectionV2 from './postV2/CacheSectionV2';
import EpilogueV2 from './postV2/EpilogueV2';




const CodeMirrorEditor = dynamic(() => import('../components/CodeMirrorEditor'), {
    ssr: false,
});

const allContents = [
    {
        title: "프로젝트 개요",
        content: [
            { header: "주요 기능 및 기술 개요" },      // section-0-0
            { header: "아키텍처" },                 // section-0-1
            { header: "Flow 예시" }                // section-0-2
        ]
    },
    {
        title: "NextAuth - 인증 시스템",
        content: [
            { header: "Provider 설정" },                 // section-1-0
            { header: "Layout에 Provider 적용" },        // section-1-1
            { header: "인증 미들웨어 구성" },               // section-1-2
            { header: "API 인증 유틸을 통한 강화된 보안" },   // section-1-3
        ]
    },
    {
        title: "데이터베이스",
        content: [
            { header: "Prisma 개요" },                   // section-2-0
            { header: "Prisma Schema 핵심 구조" },        // section-2-1
            { header: "데이터 모델링 설계 포인트" },          // section-2-2
            // { header: "..." },   // section-2-3
        ]
    },
    {
        title: "대시보드 시스템",
        content: [
            { header: "사용자 액션 기반 워크플로우" },         // section-3-0
            { header: "데이터 필터링 및 변환" },             // section-3-1
            { header: "미션 일일완료 및 삭제 처리" },         // section-3-2
            { header: "Optimistic UI 전략" },            // section-3-3
            { header: "콜백 전달 & 조건부 렌더링" },         // section-3-4
            { header: "만료 미션 자동 처리" },              // section-3-5
            // { header: "..." },   // section-3-0
        ]
    },
    {
        title: "캘린더 컴포넌트",
        content: [
            { header: "모듈화 설계" },                   // section-4-0
            { header: "훅과 유틸리티 구조" },              // section-4-1
            { header: "성능 최적화" },                   // section-4-2
            // { header: "..." },   // section-4-0
        ]
    },
    {
        title: "미션 페이지",
        content: [
            { header: "컴포넌트 구조" },            // section-5-0
            { header: "워크플로우" },               // section-5-1
            // { header: "..." },   // section-5-0
        ]
    },
    {
        title: "사용자 프로필 관리",
        content: [
            { header: "프로필 페이지 구성" },                   // section-6-0
            { header: "배지 데이터 관리" },        // section-6-1
            { header: "계정 삭제 API 구현" },          // section-6-2
            // { header: "..." },   // section-6-0
        ]
    },
    {
        title: "캐싱 시스템",
        content: [
            { header: "개요" },                             // section-7-0
            { header: "서버 측 캐싱 구조" },                    // section-7-1
            { header: "API 캐싱 헤더 적용" },                   // section-7-2
            { header: "클라이언트 이벤트 동기화 시스템" },          // section-7-3
            { header: "데이터 흐름 시나리오" },                 // section-7-4
            { header: "제약사항 및 개선 방향" },                // section-7-5
            // { header: "..." },   // section-7-0
        ]
    },
    //...
];

export default function MotivationAppV2() {
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

                    <IntroSectionV2 />
                    <AuthSectionV2 />
                    <DBSectionV2 />
                    <DashboardSectionV2 />
                    <CalendarSectionV2 />
                    <MissionsSectionV2 />
                    <ProfileSectionV2 />
                    <CacheSectionV2 />
                    <EpilogueV2 />

                </div>
            </div>
        </>
    );
}