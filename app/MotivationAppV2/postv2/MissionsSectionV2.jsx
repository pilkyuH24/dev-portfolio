import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function MissionsSectionV2() {
    return (
        <div className="mb-32">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">미션 페이지</h2>
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">페이지 개요</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-12">
                    이 시스템은 사용자가 일정 기간 동안 수행할 미션을 선택하고 관리할 수 있는 기능을 제공합니다. 
                    미션은 유형별로 분류되며, 다양한 반복 패턴으로 설정할 수 있습니다.
                </p>

            <section id="section-5-0" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">컴포넌트 구조</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    미션 관리 시스템은 다음과 같은 컴포넌트로 구성되어 있습니다:
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    1. <strong>MissionsPage</strong> (상위 컴포넌트): 미션 데이터 관리 및 그룹화, 미션 시작/종료 로직 처리<br />
                    2. <strong>MissionTypeSection</strong> (중간 컴포넌트): 미션 타입별 섹션 표시, 해당 타입의 미션 목록 렌더링<br />
                    3. <strong>MissionStartForm</strong> (모달 컴포넌트): 미션 시작 설정 폼, 날짜, 기간, 반복 유형 설정 기능<br />
                    4. <strong>useMissions</strong> (데이터 훅): 미션 데이터 로딩 및 상태 관리
                </p>
                
            </section>

            <section id="section-5-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">워크플로우</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    미션 관리 시스템의 주요 워크플로우는 다음과 같습니다:
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    1. <strong>미션 목록 로딩</strong>: useMissions 훅을 통해 API에서 데이터 가져오며, 로딩 중에는 Loader 컴포넌트를 표시합니다. 로딩 완료 후 미션을 타입별로 그룹화합니다.<br /><br />
                    
                    2. <strong>미션 선택 및 시작</strong>: 사용자가 미션을 선택하면 handleOpenMissionForm 함수가 호출되고, MissionStartForm 모달이 표시됩니다. 사용자는 이 모달에서 미션 세부 설정을 입력합니다.<br /><br />
                    
                    3. <strong>미션 생성 제출</strong>: 사용자가 폼을 제출하면 handleStartMission 함수가 호출되어 데이터를 API로 전송합니다. 성공 시 사용자에게 알림을 표시하고 모달을 닫습니다.<br /><br />
                    
                    4. <strong>API 처리 흐름</strong>: 서버에서는 사용자 인증을 확인하고, 데이터 유효성을 검사합니다. 미션을 생성하고 반복 일정에 따른 로그를 생성한 후, 캐시를 무효화하고 응답을 반환합니다.
                </p>
                <CodeMirrorEditor
                    code={`// 미션 시작 API 호출 예시
const handleStartMission = async (formData) => {
  try {
    const start = new Date(formData.startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(formData.endDate);

    const response = await fetch("/api/user-missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        missionId: formData.mission.id,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        repeatType: formData.repeatType,
        repeatDays: formData.repeatType === "CUSTOM"
          ? formData.repeatDays
          : [false, false, false, false, false, false, false],
      }),
    });

    if (!response.ok) {
      throw new Error("Mission already exists or fail to be added.");
    }

    alert("Mission started successfully!");
    handleCloseMissionForm();
  } catch (error) {
    console.error(error);
    alert("Failed to start mission. Please try again.");
  }
};`} 
                />
            </section>
        </div>
    );
}
