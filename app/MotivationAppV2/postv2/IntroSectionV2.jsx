import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function IntroSectionV2() {
  return (
    <div className="mt-16 mb-32">
      <section id="section-0-0" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">프로젝트 개요</h2>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          <strong>The Motivation App</strong>은 사용자가 자신의 목표(미션)를 설정하고
        </p>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          이를 일일 단위로 관리할 수 있도록 도와주는 미션 관리 웹 애플리케이션입니다.
        </p>
      </section>

      <section id="section-0-1" className=" scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">주요 기능 및 기술 개요</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-4">
          <strong>The Motivation App</strong>은 반복적인 목표 달성을 돕는 미션 관리 앱으로, 아래와 같은 주요 기능과 기술로 구성되어 있습니다:
        </p>
        <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
          <li>사용자 미션 생성/편집 및 반복 주기 설정</li>
          <li>캘린더 기반 UI로 일일 완료 여부 체크 및 시각화</li>
          <li>사용자 데이터 조건에 따라 뱃지 부여</li>
          <li>NextAuth 기반 인증, Prisma 기반 DB 연동</li>
          <li>대시보드에서 상태 관리 기능 제공</li>
        </ul>
        <p className="text-base text-gray-900 dark:text-gray-200 font-gowun mt-4">
          프레임워크 및 사용된 기술: <strong>Next.js 15, React 18.2, Tailwind CSS, Prisma, PostgreSQL, Vercel, Railway</strong>
        </p>
      </section>

      <section id="section-0-3" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">Flow 예시</h3>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-gowun">Flow 1: 로그인 & 인증</h3>
          <CodeMirrorEditor
            code={`사용자 → Google 로그인 클릭
        → /api/auth/[...nextauth] → lib/auth.ts
        → prisma.user.upsert() → 유저 DB 자동 생성
        → 세션 반환 → 클라이언트에서 useSession()`} //지금 클라이언트에서 useSession() 유효한지 확인
          />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-gowun">Flow 2: 미션 등록</h3>
          <CodeMirrorEditor
            code={`사용자 → /missions → 미션 선택
        → /api/user-missions (POST)
        → lib/prisma.ts → userMission + logs 생성`}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-gowun">Flow 3: 오늘 미션 완료 / 뱃지 조건 검사 및 부여</h3>
          <CodeMirrorEditor
            code={`사용자 → Dashboard → 오늘 완료 클릭
        → /api/user-missions/[id]/complete-today (POST)
        → UserMissionLog 업데이트
        → 미션 종료일인 경우 → 상태: 'COMPLETED'`} // 추가 
          />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-gowun">Flow 4: 미션 삭제</h3>
          <CodeMirrorEditor
            code={`사용자 → "Delete Mission" 버튼 클릭 → confirm 확인
→ DELETE 요청: /api/user-missions/
→ 사용자 인증 및 소유권 검증
→ userMission.delete({ id })
→ (연관된 로그는 cascade로 자동 삭제됨)
→ 응답: { message: "Mission deleted successfully" }`}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-gowun">Flow 5: 유저 삭제</h3>
          <CodeMirrorEditor
            code={`사용자 → 계정 삭제 버튼 클릭 → 확인 과정
→ DELETE 요청: /api/user/delete
→ 사용자 인증 확인
→ prisma.$transaction 시작
→ mission logs → badges → missions → user 순차 삭제
→ 성공 시 응답: { success: true, message: "Account successfully deleted." }
→ 실패 시 전체 트랜잭션 롤백`}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-gowun">Flow 6: 성능 최적화를 위한 캐싱 전략</h3>
          <CodeMirrorEditor
            code={`첫 요청: 클라이언트 → 서버 캐시 확인 → 캐시 없음
→ DB 조회 → 서버 캐시 저장 → 응답

캐시 히트: 클라이언트 → 서버 캐시 확인 → 유효 캐시
→ 'Cache-Control: max-age=60' 응답

데이터 갱신: 클라이언트 → 미션 업데이트
→ DB 업데이트 → 캐시 무효화
→ 클라이언트 이벤트 발행 → 컴포넌트 재요청

페이지 이동: 대시보드 → 캐시 데이터 로드 → 다른 페이지
→ 대시보드 복귀 → 캐시 데이터 즉시 표시`}
          />
        </div>
      </section>

    </div>
  );
}


