import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function CalendarSectionV2() {
    return (
        <div className="mb-32">
            <section id="section-4-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">캘린더 컴포넌트</h2>
                <div className="w-full flex justify-start mt-4">
                    <video
                        src="posts/calendar_mov2.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="rounded-lg shadow-md w-1/2 h-1/2 "
                    />
                </div>
            </section>

            <section id="section-4-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">모듈화 설계</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    캘린더 관련 UI는 각각의 책임에 따라 다음과 같이 분리되어 있습니다:<br /><br />
                    - <b>Calendar</b>: 메인 캘린더 뷰 및 날짜 상태 분배<br />
                    - <b>CalendarHeader</b>: 월 제목 및 이전/다음 월 이동 버튼 UI<br />
                    - <b>CalendarDay</b>: 개별 날짜 셀 UI 및 상태별 스타일 처리<br />
                    - <b>CalendarModal</b>: 날짜 클릭 시 표시되는 상세 미션 로그 모달<br /><br />
                    이러한 구조는 단일 책임 원칙(SRP)을 따르고 있어 각 컴포넌트의 역할이 명확하며, 기능 추가나 스타일 변경 시 해당 컴포넌트만 수정하면 되므로 유지보수가 수월합니다. 또한, 각 컴포넌트는 자체적으로 독립적인 기능을 수행하기 때문에 다른 페이지나 기능에서도 손쉽게 재사용할 수 있는 유연성을 갖추고 있습니다.
                </p>
            </section>

            <section id="section-4-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">훅과 유틸리티 구조</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    캘린더 전용 로직은 <code>useCalendarData</code> 훅과 <code>calendarService.ts</code> 유틸리티로 분리되어 있습니다.<br />
                    - <b>useCalendarData</b>: 캘린더 월 상태, 선택된 날짜, 로그 맵 관리<br />
                    - <b>calendarService.ts</b>: UTC 변환, 반복 미션 로직, 상태 계산 등 비즈니스 로직 처리<br /><br />
                    이렇게 로직을 UI와 분리함으로써 컴포넌트는 더 가볍고 명확해지며, 각 요소는 보다 명확한 역할을 수행하게 됩니다. 복잡한 연산이나 반복 로직은 유틸리티에 위임하고, 뷰는 그 결과를 받아 시각화하는 구조로 유지보수성과 테스트 용이성이 크게 향상됩니다. 이는 장기적으로 기능 확장이나 리팩토링 시 안정성을 높이는 데 기여합니다.
                </p>
            </section>


            <section id="section-4-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">성능 최적화</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    렌더링 최적화를 위해 다양한 메모이제이션 및 캐싱 전략을 적용했습니다.<br /><br />
                    1) useMemo를 통한 메모이제이션
                </p>
                <CodeMirrorEditor
                    code={`const calendarData = useMemo(() => {
  // 월간 날짜 데이터 생성
}, [currentDate]);`}
                />
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-4">
                    2) 날짜별 로그 탐색 최적화
                </p>
                <CodeMirrorEditor
                    code={`const logMap = new Map<string, Log[]>();
logs.forEach((log: Log) => {
  const logDateStr = toUTCString(parseISO(log.date)); 
  if (!logMap.has(logDateStr)) logMap.set(logDateStr, []);
  logMap.get(logDateStr)!.push(log);
});`}
                />
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-4">
                    3) 최소 상태 업데이트
                </p>
                <CodeMirrorEditor
                    code={`const handleDateClick = (day: Date) => {
  const utcDay = getUTCDate(day);
  setModalLogs(filteredLogs); // 해당 날짜 로그만 필터링
  setSelectedDate(utcDay);
};`}
                />
            </section>
        </div>
    );
}