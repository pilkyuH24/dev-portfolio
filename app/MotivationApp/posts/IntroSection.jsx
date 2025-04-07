import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor"; 

export default function IntroSection() {
  return (
    <div className="mt-16 mb-32">
      <section id="section-0-0" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">프로젝트 개요</h2>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          The Motivation App은 사용자가 자신의 목표(미션)를 설정하고 이를 일일 단위로 관리할 수 있도록 도와주는 미션 관리 웹 애플리케이션입니다...
        </p>
      </section>

      <section id="section-0-1" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">주요 기능</h2>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          The Motivation App의 핵심 기능은 다음과 같습니다:
        </p>
        <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
          <li>사용자 미션 생성/편집</li>
          <li>일일 완료 여부 체크 및 시각화 (캘린더 기반 UI)</li>
          <li>진행률 기반 배지 획득 시스템</li>
          <li>대시보드에서 미션 상태 통계 확인</li>
          <li>NextAuth.js 기반 사용자 인증 및 세션 유지</li>
        </ul>
      </section>

      <section id="section-0-2" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">기술 스택 및 아키텍처</h2>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          MVP 구현에는 다음 기술 스택을 사용하였고...
        </p>
        <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
          <li><strong>Frontend:</strong> Next.js 15.0.3, React 19.0.0, Tailwind CSS </li>
          <li><strong>Backend:</strong> Next.js API Routes, Prisma</li>
          <li><strong>Database:</strong> PostgreSQL (Railway)</li>
          <li><strong>Auth:</strong> NextAuth.js</li>
          <li><strong>Deployment:</strong> Vercel, Railway</li>
        </ul>
      </section>

      <section id="section-0-3" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">디렉토리 구조</h2>
        <div className="my-6">
          <CodeMirrorEditor
            code={`motivation-app/
├── app/
│   ├── api/
│   ├── components/
│   ├── dashboard/
│   ├── missions/
│   ├── profile/
│   ├── utils/
│   ├── layout.tsx
│   ├── provider.tsx
│   └── page.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── badgeEngine.ts
│   └── badgeEngineHelpers.ts
├── prisma/
├── types/`}
          />
        </div>
      </section>
      <section id="section-0-4" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">API 구조</h2>
        <div className="my-6">
          <CodeMirrorEditor
            code={`app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts          // NextAuth 핸들러
├── missions/
│   └── route.ts              // /api/missions
├── user/
│   └── badges/
│       └── route.ts          // /api/user/badges
├── user-missions/
│   ├── [missionId]/
│   │   ├── complete-today/
│   │   │   └── route.ts      // /api/user-missions/[missionId]/complete-today
│   │   └── route.ts          // /api/user-missions/[missionId]
│   └── route.ts              // /api/user-missions
├── route.ts                  
`}
          />
        </div>
      </section>
    </div>
  );
}


