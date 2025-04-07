import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor"; 

export default function DashboardSection() {
    return (
        <div className="mb-32">
            <section id="section-3-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">Dashboard - 미션 현황 및 조작</h2>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    본 페이지는 사용자의 미션 진행 상태를 시각화하고 조작할 수 있도록 설계된 대시보드입니다. 캘린더를 통해 일자별 진행 여부를 확인할 수 있으며, 캘린더 우측 영역에는 현재 진행 중인 미션 목록이 표시됩니다. 각 미션은 개별적으로 클릭하여 상세 조작이 가능합니다.
                </p>
                <div className="w-full flex justify-start mt-4">
                    <video
                        src="posts/dashboard_mov.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="rounded-lg shadow-md w-1/3 h-1/2 "
                    />
                </div>
            </section>

            <section id="section-3-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">사용된 API 구조 개요</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    Dashboard 페이지는 다음과 같은 API 경로를 호출합니다:
                </p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    <li><code>GET /api/user-missions</code>: 유저의 전체 미션 및 로그를 조회합니다.</li>
                    <li><code>POST /api/user-missions/[missionId]/complete-today</code>: 오늘 미션을 완료 처리합니다.</li>
                    <li><code>DELETE /api/user-missions</code>: 선택한 미션을 삭제합니다.</li>
                </ul>
            </section>

            <section id="section-3-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">API 호출 및 동작 원리</h3>

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    페이지가 로드되면 <code>GET /api/user-missions</code>를 통해 사용자의 전체 미션과 해당 미션에 대한 일별 로그를 가져옵니다. 응답 데이터는 상태값에 따라 <strong>진행 중</strong>, <strong>완료</strong>로 분리하여 표시됩니다.
                </p>

                <CodeMirrorEditor
                    code={`// app/api/user-missions/route.ts
export async function GET() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  const userMissions = await prisma.userMission.findMany({
    where: { userId: user.id },
    include: {
      mission: { select: { title: true, description: true } },
      logs: { select: { date: true, isDone: true } }
    }
  });

  return NextResponse.json(userMissions);
}`}
                />

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun my-4">
                    각 미션 카드에서는 <strong>오늘 완료</strong> 버튼을 통해 <code>POST /api/user-missions/[missionId]/complete-today</code>를 호출합니다.
                    이 API 경로는 <strong>Next.js의 동적 라우팅</strong>을 활용하여 구현되었습니다.
                    <code>[missionId]</code>는 파일 이름에서 대괄호로 감싸 작성함으로써 요청 시 전달된 실제 미션 ID를 변수처럼 처리할 수 있습니다.
                    예를 들어 <code>/api/user-missions/42/complete-today</code> 요청은 <code>[missionId]=42</code>로 인식됩니다.
                    해당 API는 오늘자 로그를 완료 처리하며, 만약 오늘이 미션 종료일이라면 미션 전체 상태를 <code>COMPLETED</code>로 변경합니다.
                </p>


                <CodeMirrorEditor
                    code={`// app/api/user-missions/[missionId]/complete-today/route.ts
await prisma.userMissionLog.update({
  where: { userMissionId_date: { userMissionId, date: today } },
  data: { isDone: true },
});

// 마지막 날짜인지 확인 후 상태 업데이트
if (isLastDay && allLogsCompleted) {
  await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: 'COMPLETED' },
  });
}`}
                />

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun my-4">
                    <strong>미션 삭제</strong>는 <code>DELETE /api/user-missions</code> 경로를 통해 이루어지며, 요청 시 <code>missionId</code>를 전달합니다.
                </p>

                <CodeMirrorEditor
                    code={`// app/api/user-missions/route.ts
export async function DELETE(req: Request) {
  const { missionId } = await req.json();
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  await prisma.userMission.deleteMany({
    where: { id: missionId, userId: user.id } // 사용자 확인
  });

  return NextResponse.json({ message: "Deleted" });
}`}
                />
            </section>

            <section id="section-3-3" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">보안 처리 및 취약점 방지</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    모든 API는 <code>getServerSession(authOptions)</code>을 통해 현재 로그인한 사용자를 인증한 뒤 작동합니다.
                    미션을 불러오거나 수정, 삭제할 때 반드시 <strong>userId === session.user.id</strong> 인지 비교하여
                    <strong>다른 사용자의 데이터에 접근하지 못하도록 제한</strong>하고 있습니다.
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    예를 들어 악의적인 사용자가 직접 <code>/api/user-missions/123/delete</code> 와 같이
                    임의의 미션 ID를 호출하더라도, 해당 미션이 본인의 소유가 아닐 경우 삭제되지 않습니다.
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    이와 같은 공격은 <strong>Insecure Direct Object Reference (IDOR)</strong>, 즉 <strong>직접 객체 참조 취약점</strong>이라고 불립니다.
                    이는 인증되지 않은 사용자가 URL, 폼 데이터, 쿼리 파라미터 등을 조작하여 <strong>다른 사용자의 리소스에 접근</strong>하는 보안 취약점입니다.
                    <br />
                    따라서 모든 요청에서 세션 정보 기반의 <strong>소유자 확인 및 권한 검증</strong>은 필수적인 보안 조치입니다.
                </p>
            </section>

        </div>
    );
}
