import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function IntroSection() {
  return (
    <div className="mt-16 mb-32">
      <section id="section-0-0" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">프로젝트 개요</h2>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          The Motivation App은 사용자가 자신의 목표(미션)를 설정하고 
          </p>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          이를 일일 단위로 관리할 수 있도록 도와주는 미션 관리 웹 애플리케이션입니다.
        </p>
      </section>

      <section id="section-0-1" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">주요 기능 및 기술 개요</h2>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-4">
          The Motivation App은 반복적인 목표 달성을 돕는 미션 관리 앱으로, 아래와 같은 주요 기능과 기술로 구성되어 있습니다:
        </p>
        <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
          <li>사용자 미션 생성/편집 및 반복 주기 설정</li>
          <li>캘린더 기반 UI로 일일 완료 여부 체크 및 시각화</li>
          <li>진행률 기반 배지 획득 및 포인트 부여 시스템</li>
          <li>대시보드에서 통계 및 상태 관리 기능 제공</li>
          <li>NextAuth 기반 인증, Prisma 기반 DB 연동</li>
        </ul>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-4">
          기술 스택: Next.js 15, React 18.2, Tailwind CSS, Prisma, PostgreSQL, Vercel, Railway
        </p>
      </section>

      <section id="section-0-2" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">디렉토리 및 API 구조 요약</h2>
        <CodeMirrorEditor
          code={`motivation-app/
├── app/               // 페이지 & API 핸들러
│   ├── api/           // 인증, 미션, 유저 API
│   ├── dashboard/     // 대시보드 UI
│   └── missions/      // 미션 리스트
├── lib/               // 인증 및 배지 로직
├── prisma/            // DB 스키마
├── types/             // 타입 정의`}
        />
        <CodeMirrorEditor
          code={`app/api/
├── auth/[...nextauth]   // 로그인/세션 처리
├── missions/            // 전체 미션 불러오기
├── user-missions/       // 유저 미션 등록/조회/삭제
├── user/badges/         // 유저 배지 조회`}
        />
      </section>
      <section id="section-0-3" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">전체 구조 아키텍처</h2>
        <div className="flex justify-center">
          <img
            src="posts/motivation-app-architecture.svg"
            alt="Motivation App Architecture Diagram"
            className="rounded-md shadow-md w-1/2 max-w-3xl"
          />
        </div>
      </section>
      <section id="section-0-4" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">Flow 예시</h2>

        <div className="mb-6">
          <h3 className="text-xl font-bold font-gowun mb-2">Flow 1: 미션 등록</h3>
          <CodeMirrorEditor
            code={`사용자 → /missions → 미션 선택
        → /api/user-missions (POST)
        → lib/prisma.ts → userMission + logs 생성`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold font-gowun mb-2">Flow 2: 오늘 미션 완료</h3>
          <CodeMirrorEditor
            code={`사용자 → Dashboard → 오늘 완료 클릭
        → /api/user-missions/[id]/complete-today (POST)
        → UserMissionLog 업데이트
        → 미션 종료일인 경우 → 상태: 'COMPLETED'`}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold font-gowun mb-2">Flow 3: 로그인 & 인증</h3>
          <CodeMirrorEditor
            code={`사용자 → Google 로그인 클릭
        → /api/auth/[...nextauth] → lib/auth.ts
        → prisma.user.upsert() → 유저 DB 자동 생성
        → 세션 반환 → 클라이언트에서 useSession()`}
          />
        </div>
      </section>

    </div>
  );
}


