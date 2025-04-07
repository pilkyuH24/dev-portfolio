import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function CalendarSection() {
    return (
        <div className="mb-32">
            <section id="section-4-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">캘린더 기능 설명</h2>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    대시보드의 좌측에는 사용자의 미션 진행 현황을 달력 형태로 표시하는 캘린더 컴포넌트가 위치합니다. 사용자의 <strong>로그 기록</strong>과 <strong>예정된 반복 미션</strong> 정보를 바탕으로 날짜별로 다른 색상으로 시각화합니다.
                </p>
                <div className="w-full flex justify-start mt-4">
                    <video
                        src="posts/calendar_mov.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="rounded-lg shadow-md w-1/2 h-1/2 "
                    />
                </div>
            </section>

            <section id="section-4-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">1. 로그 기반 시각화</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    props로 전달받은 <code>logs</code> 배열을 기반으로 각 날짜의 완료 여부를 시각화합니다.
                    <br />완료된 날짜는 파란색, 실패한 날짜는 빨간색, 일부 성공은 주황색, 미래의 예정된 미션은 회색으로 표시됩니다.
                </p>
                <CodeMirrorEditor
                    code={`interface Log {
  date: string;
  isDone: boolean;
  missionTitle: string;
}`}
                />
            </section>

            <section id="section-4-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">2. 날짜 클릭 시 모달 표시</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    특정 날짜를 클릭하면 해당 날짜에 해당하는 미션들의 진행 상태를 보여주는 <code>CalendarModal</code>이 열립니다. <br />
                    과거의 날짜는 실제 로그 기록을 기준으로, 미래 날짜는 반복 규칙(<code>repeatType</code>, <code>repeatDays</code>)에 따라 예측된 미션이 표시됩니다.
                </p>
            </section>

            <section id="section-4-3" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">3. Dashboard에서의 props 전달 구조</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    <code>Dashboard</code> 페이지에서는 다음 두 가지 데이터를 캘린더로 전달합니다:
                </p>
                <ul className="list-disc ml-6 text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    <li><code>logs</code>: 각 미션의 일일 수행 여부를 담은 배열</li>
                    <li><code>userMissions</code>: 반복 규칙 정보를 포함한 미션 정보 배열</li>
                </ul>

                <CodeMirrorEditor
                    code={`<Calendar
  logs={calendarLogs}
  userMissions={calendarMissions}
/>`}
                />
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-2">
                    여기서 <code>calendarLogs</code>는 각 <code>userMission.logs</code>를 펼쳐서 만든 배열이며, <code>calendarMissions</code>는 모달에서 반복 계산에 필요한 최소 정보만 포함한 구조입니다.
                </p>
            </section>
        </div>
    );
}
