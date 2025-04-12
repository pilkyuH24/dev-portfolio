import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function EpilogueV2() {
    return (
        <div className="mb-32">
            
            <section id="section-5-1" className="mb-12 scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 font-gowun underline decoration-sky-500">추가 개선 사항 및 경험 등등</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-4">
                    Railway기준 서버시간을 맞추기 위해서 UTC 기준으로 했는데 여러 기능이 유저 브라우저 기준인 것들이 있어. 
                    현재 두가지를 염두해고 있습니다. DB저장을 UTC로 하고 달력에서 표시를 local로 하는법. DB 저장자체를 local로 하고 비교하는 기능들도 local로 비교하도록 구현.
                </p>

                {/**  */}

            </section>
            <section id="section-7-5" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">제약사항 및 개선 방향</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    여러 탭이나 다른 장치에서 사용시 DB에서 데이터 로딩 문제의 불편함을 느꼈습니다.
                    현재 서버 재시작 시 캐시 초기화, 분산 서버 간 캐시 공유 불가 등의 한계가 존재합니다. 향후 Redis 기반 분산 캐시 도입 및 WebSocket 기반 실시간 동기화 기능 도입을 고려하고 있습니다.
                </p>
                {/* 👉 <a href="/MotivationApp" className="text-sky-500 underline hover:text-sky-700">버전 1 페이지 링크</a> */}
            </section>

                {/**  */}

        </div>
    );
}
