import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function MissionProfileFutureSection() {
    return (
        <div className="mb-32">
            {/* 미션 페이지 설명 */}
            <section id="section-5-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">미션 & 프로필 페이지 + 개선 방향</h2>

                <h3 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">Missions 페이지</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-4">
                    사용자는 미리 정의된 다양한 미션을 탐색하고 원하는 미션을 시작할 수 있습니다. 미션은 카테고리별로 구분되어 시각적으로 나뉘며, 카드를 클릭하여 반복 주기 설정과 시작일/종료일을 지정하고 도전할 수 있습니다.
                </p>

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    미션 목록은 다음 API를 통해 불러옵니다:
                </p>
                <CodeMirrorEditor
                    code={`// GET /api/missions
export async function GET() {
  const missions = await prisma.mission.findMany();
  return NextResponse.json(missions);
}`}
                />

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-4">
                    사용자가 미션을 시작하면 아래 예와 같은 API로 POST 요청을 보냅니다. <code>repeatType</code>과 <code>repeatDays</code> 설정에 따라 미션 반복 주기를 정의합니다.
                </p>
                <CodeMirrorEditor
                    code={`// POST /api/user-missions
{
  missionId: 1,
  startDate: "2025-04-01",
  endDate: "2025-04-30",
  repeatType: "CUSTOM",
  repeatDays: [false, true, false, true, false, false, false]
}`}
                />
            </section>

            {/* 프로파일 페이지 설명 */}
            <section id="section-5-1" className="mb-12 scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">Profile 페이지</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-4">
                    Profile 페이지는 로그인된 사용자의 기본 정보와 포인트, 획득한 배지를 시각적으로 보여주는 페이지입니다. 인증된 사용자만 접근 가능하며, <code>useSession()</code> 훅을 통해 세션 정보를 가져옵니다.
                </p>

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    획득한 배지는 아래 API를 통해 불러옵니다:
                </p>
                <CodeMirrorEditor
                    code={`// GET /api/user/badges
export async function GET() {
  const user = await getSessionUser();
  const badges = await prisma.userBadge.findMany({
    where: { userId: user.id },
    include: { badge: true },
  });
  return NextResponse.json(badges.map((b) => b.badge));
}`}
                />
            </section>

            {/* 개선사항 */}
            <section id="section-5-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">향후 개선 사항</h3>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    <li>유저의 미션 성공률 및 행동 패턴을 분석하는 시각화 페이지 추가</li>
                    <li>탈퇴 시 모든 유저 관련 데이터 완전 삭제 처리</li>
                    <li>모든 유저들의 통계를 집계하는 관리자 페이지</li>
                    <li>로딩 지연 최소화를 위한 성능 최적화</li>
                </ul>
            </section>
        </div>
    );
}
