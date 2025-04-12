// DashboardSectionV2.jsx
import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function DashboardSectionV2() {
  return (
    <div className="mb-32">
      <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">대시보드 시스템</h2>
      <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">개요</h3>
      <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
        대시보드 시스템은 사용자의 미션 진행 상태를 시각화하고 관리하는 시스템으로, 미션 완료 처리와 배지 획득 기능을 제공합니다.
        사용자 중심의 워크플로우 설계와 프론트엔드-백엔드 간의 명확한 책임 분리를 통해 유지보수성과 확장성을 확보했습니다.
      </p>
      <div className="w-full flex justify-start mt-4 mb-12">
        <video
          src="posts/dashboard_mov2.webm"
          autoPlay
          loop
          muted
          playsInline
          className="rounded-lg shadow-md w-1/3 h-1/2 "
        />
      </div>

      <section id="section-3-0" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">사용자 액션 기반 워크플로우</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          사용자는 &quot;Complete Today&quot; 버튼을 통해 미션을 완료할 수 있으며, 이는 프론트엔드에서 API 요청 → 백엔드의 로그 및 배지 처리 → UI 상태 갱신의 흐름으로 이어집니다. 이 워크플로우는 다음과 같이 구성됩니다:<br /><br />
          1. 사용자 액션: 버튼 클릭<br />
          2. API 요청: /api/user-missions/:id/complete-today<br />
          3. 백엔드 처리: 로그 생성, 배지 평가, 상태 갱신<br />
          4. 프론트엔드 반영: 상태 업데이트 및 배지 모달 표시<br /><br />
          사용자가 &quot;Complete Today&quot; 버튼을 클릭하면 API를 통해 미션 완료 요청이 전송되며, 서버에서 미션 로그가 생성되고 배지 조건을 평가한 후 UI가 갱신됩니다.
        </p>
      </section>

      <section id="section-3-1" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">데이터 필터링 및 변환</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          원본 데이터에서 필요한 정보만 걸러내고 변환하여, 자식 컴포넌트의 역할을 단순화하고 재사용성을 높입니다.
        </p>
        <CodeMirrorEditor
          code={`const activeMissions = userMissions.filter((m) => m.status !== "COMPLETED");
const completedMissions = userMissions.filter((m) => m.status === "COMPLETED");
const selectedMissionData = userMissions.find((m) => m.mission.title === selectedMission);
const calendarSource = selectedMissionData ? [selectedMissionData] : activeMissions;
const calendarLogs = prepareLogsForCalendar(calendarSource);
const calendarMissions = calendarSource.map(prepareMissionForCalendar);`}
        />
      </section>

      <section id="section-3-2" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">미션 일일완료 및 삭제 처리</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          사용자가 특정 미션을 오늘 완료 처리하면, 서버는 해당 날짜의 로그를 <code>isDone: true</code>로 설정하고, 종료일일 경우 미션의 상태를 <code>COMPLETED</code>로 갱신합니다. 이때 새로운 뱃지가 수여될 수도 있으며, 이 모든 흐름은 하나의 API 호출로 처리됩니다.
        </p>
        <CodeMirrorEditor
          code={`[User]
  클릭 &quot;Complete Today&quot; 버튼

[Client]
  └─ POST 요청: /api/user-missions/:id/complete-today

[API 서버]
  ├─ 사용자 인증
  ├─ 미션 ID 추출 및 소유권 검증
  ├─ 오늘 날짜(UTC 00:00) 계산
  ├─ userMissionLog.upsert
  │     - 없으면 생성
  │     - 있으면 isDone: true로 갱신
  └─ 종료일이면:
       ├─ 미션 상태 COMPLETED로 갱신
       ├─ evaluateAllBadgesForUser 실행
       └─ 신규 뱃지 목록 반환

[Client]
  └─ 응답 수신:
        {
          message,
          isCompleted,
          newBadges
        }`}
        />
        <p className="text-lg mt-4 text-gray-900 dark:text-gray-200 font-gowun mb-12">
          <code>userMissionLog</code>는 이미 존재하는 경우 업데이트하고, 없으면 새로 생성하여 오늘 완료를 기록합니다.<br />
          또한, 오늘이 미션의 종료일일 경우, 미션 상태를 <code>COMPLETED</code>로 변경하고, 유저의 뱃지 조건을 다시 평가하여 새로운 보상이 지급될 수 있습니다.
        </p>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          사용자가 더 이상 원하지 않는 미션을 삭제할 경우, API는 미션과 연결된 로그를 포함하여 모두 삭제합니다. 이 과정은 데이터베이스의 외래키 제약 조건(cascade delete)을 활용하여 자동화되어 있으며, 단일 요청으로 빠르게 수행됩니다.
        </p>
        <CodeMirrorEditor
          code={`[User]
  클릭 &quot;Delete Mission&quot; 버튼 → confirm 확인

[Client]
  └─ DELETE 요청: /api/user-missions/:id

[API 서버]
  ├─ 사용자 인증
  ├─ 미션 ID 추출 및 소유권 검증
  └─ Prisma 삭제:
        userMission.delete({ id })
       (연관된 로그는 cascade로 자동 삭제됨)

[Client]
  └─ 응답 수신:
        {
          message: &quot;Mission deleted successfully&quot;
        }`}
        />
        <p className="text-lg mt-4 text-gray-900 dark:text-gray-200 font-gowun">
          프론트엔드에서는 사용자의 실수 방지를 위해 <code>confirm()</code>을 활용하여 삭제를 한 번 더 확인하도록 합니다. 백엔드는 항상 인증 및 소유권 검증을 선행하므로, 다른 사용자의 미션을 삭제하는 것은 불가능합니다.<br />
          성공적으로 삭제되면 간단한 메시지 응답이 반환되며, 관련 로그는 별도의 작업 없이 자동으로 제거됩니다.
        </p>
      </section>

      <section id="section-3-3" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">Optimistic UI 전략</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          Optimistic UI는 사용자 경험 향상을 위해 서버 응답을 기다리지 않고 UI를 먼저 갱신하는 전략입니다. 사용자가 &quot;Complete Today&quot; 또는 &quot;Delete Mission&quot; 버튼을 클릭하면, API 요청 전에 프론트엔드에서 미션 데이터를 즉시 변경하여 빠른 피드백을 제공합니다.<br /><br />
          예를 들어, 오늘 미션 완료 시 서버에 로그가 기록되기 전이라도 프론트엔드는 해당 미션에 오늘자 로그를 추가하고 버튼 상태를 &quot;Completed&quot;로 변경합니다. 마찬가지로 미션 삭제 시에도 UI에서 즉시 해당 항목을 제거합니다.<br /><br />
          이러한 방식은 서버 요청이 성공할 것을 전제로 작동하지만, 실패할 경우를 대비하여 서버 응답 실패 시에는 데이터를 다시 불러오는 롤백 메커니즘도 포함되어 있어 안정성을 확보합니다.<br /><br />
          결과적으로 Optimistic UI 전략은 응답 대기 시간을 줄이고 앱의 반응성을 높여 사용자 만족도를 향상시키는 핵심 UX 요소로 작용합니다.
        </p>
        <CodeMirrorEditor
          code={`<MissionActions
  missionId={mission.id}
  logs={mission.logs}
  status={mission.status}
  onMissionUpdate={refreshMissions}
  onOptimisticUpdate={(type, id) => {
    if (type === &quot;complete&quot;) {
      setLocalMissions(prev =>
        prev.map(m =>
          m.id === id
            ? {
                ...m,
                logs: [...m.logs, { date: new Date().toISOString(), isDone: true }],
              }
            : m
        )
      );
    } else if (type === &quot;delete&quot;) {
      setLocalMissions(prev => prev.filter(m => m.id !== id));
    }
  }}
/>`}
        />
      </section>

      <section id="section-3-4" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">콜백 전달 & 조건부 렌더링</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          부모 컴포넌트는 콜백 함수를 자식에게 전달하여 상호작용을 관리합니다. MissionList 컴포넌트는 props를 통해 데이터와 함께 상태 변경 함수도 전달받아 효율적인 단방향 데이터 흐름을 구현합니다. 또한 type 속성을 통해 조건부 렌더링을 적용하여 동일한 컴포넌트로 다양한 상황에 대응합니다.
        </p>
        <CodeMirrorEditor
          code={`<MissionList
  missions={activeMissions}          // 진행 중인 미션 데이터
  selectedMission={selectedMission}  // 현재 선택된 미션 상태
  onSelectMission={setSelectedMission} // 미션 선택 시 호출할 함수
  onMissionUpdate={refreshMissions}  // 미션 완료 후 데이터 갱신 함수
  type=&quot;active&quot;                      // 진행 중인 미션 모드로 렌더링
/>`}
        />
        <p className="text-lg mt-4 text-gray-900 dark:text-gray-200 font-gowun">
          각 props는 명확한 목적을 가지고 있습니다. missions는 필터링된 미션 데이터를 전달하고, selectedMission은 현재 선택 상태를 공유합니다. onSelectMission과 onMissionUpdate는 자식 컴포넌트가 부모의 상태를 안전하게 변경할 수 있는 통로를 제공합니다.<br />
          type 속성은 컴포넌트의 렌더링 모드를 결정하여 &quot;active&quot; 값일 때는 완료 버튼을 표시하는 등 상황에 맞는 UI를 구성합니다. 이러한 패턴은 코드 재사용성을 높이고 상태 관리를 단순화하며 UI 복잡도를 효과적으로 관리합니다.
        </p>
      </section>

      <section id="section-3-5" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">만료 미션 자동 처리</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
          만료된 미션은 클라이언트 요청 시 서버에서 자동으로 완료 처리됩니다. 이 처리는 백그라운드에서 비동기적으로 실행되며, 즉각적인 UI 반영과 빠른 응답 속도를 제공합니다. 실패한 경우 캐시 무효화를 통해 복구됩니다.
        </p>
        <CodeMirrorEditor
          code={`export async function missionCompleteHandler(userMissionId: number) {
  const userMission = await prisma.userMission.findUnique({
    where: { id: userMissionId },
    include: { user: true, mission: true },
  });

  if (!userMission) throw new Error(\`UserMission \${userMissionId} not found\`);
  if (userMission.status === "COMPLETED") return;

  await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: "COMPLETED" },
  });
}`}
        />
      </section>
    </div>
  );
}