import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function CacheSectionV2() {
    return (
        <div className="mb-32">
            <section id="section-7-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">캐싱 시스템</h2>
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">개요</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    본 문서는 미션 트래킹 애플리케이션에 구현된 다중 레이어 캐싱 시스템에 대한 기술적 설명입니다. 이 시스템은 서버 측 메모리 캐시와 클라이언트 측 브라우저 캐싱을 결합하여 사용자 경험을 개선하고 데이터베이스 부하를 줄이도록 설계되었습니다.
                </p>
            </section>

            <section id="section-7-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">서버 측 캐싱 구조</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    서버 캐시(serverCache.ts)는 Map 객체를 활용한 인메모리 저장소로, 사용자별 미션 데이터를 캐시합니다. TTL(Time To Live)은 1분으로 설정되어 있으며, 30분 주기로 자동 정리됩니다.
                </p>
                <CodeMirrorEditor
                    code={`interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const CACHE_TTL = 60 * 1000; // 1분
export const missionsCache = new Map<string, CacheEntry<unknown>>();`}
                />
            </section>

            <section id="section-7-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">API 캐싱 헤더 적용 </h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    HTTP 응답(user-missions/route.ts)에 캐시 헤더를 적용하여 브라우저 캐싱 동작을 제어합니다. GET 요청은 Cache-Control 및 ETag를 통해 캐시 여부를 제어하고, POST 요청 시에는 서버 캐시를 무효화합니다.
                </p>
                <CodeMirrorEditor
                    code={`return NextResponse.json(data, {
  status: 200,
  headers: {
    'Cache-Control': 'max-age=60',
    'X-Cache': 'HIT',
    'ETag': \`\${timestamp}\`,
  },
});`}
                />
            </section>

            <section id="section-7-3" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">클라이언트 이벤트 동기화 시스템 </h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    클라이언트에서는 이벤트 기반 시스템(missionEvents.ts)을 통해 미션 데이터 변경 시 컴포넌트 간 동기화를 수행합니다. 로컬 캐시 무효화 후 이벤트를 브로드캐스트합니다.
                </p>
                <CodeMirrorEditor
                    code={`const event = new CustomEvent("mission-updated");
window.dispatchEvent(event);

localStorage.removeItem("user-missions-data");
localStorage.removeItem("user-missions-timestamp");`}
                />
            </section>

            <section id="section-7-4" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">
                    데이터 흐름 및 캐싱 시나리오
                </h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-6">
                    미션 데이터를 중심으로 한 네 가지 주요 흐름입니다.
                </p>

                <h4 className="text-lg font-semibold mb-2 font-gowun text-sky-600">시나리오 1: 첫 데이터 요청</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 text-sm rounded-lg p-4 font-mono text-gray-800 dark:text-gray-100 overflow-x-auto mb-4">
                    <code>
                        클라이언트 → 서버 캐시 확인 → 캐시 없음{'\n'}
                        → DB에서 데이터 조회 → 서버 캐시에 저장{'\n'}
                        → &#39;Cache-Control: no-cache&#39; 헤더와 함께 응답 반환
                    </code>
                </pre>

                <h4 className="text-lg font-semibold mb-2 font-gowun text-sky-600">시나리오 2: 캐시된 데이터 요청</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 text-sm rounded-lg p-4 font-mono text-gray-800 dark:text-gray-100 overflow-x-auto mb-4">
                    <code>
                        클라이언트 → 서버 캐시 확인 → 유효한 캐시 존재{'\n'}
                        → &#39;Cache-Control: max-age=60&#39;, &#39;X-Cache: HIT&#39; 포함 응답
                    </code>
                </pre>

                <h4 className="text-lg font-semibold mb-2 font-gowun text-sky-600">시나리오 3: 데이터 업데이트</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 text-sm rounded-lg p-4 font-mono text-gray-800 dark:text-gray-100 overflow-x-auto mb-4">
                    <code>
                        클라이언트 → 미션 업데이트 요청{'\n'}
                        → 서버에서 DB 업데이트 → 캐시 무효화{'\n'}
                        → &#39;Cache-Control: no-cache&#39; 응답{'\n'}
                        → 클라이언트 notifyMissionUpdated() 호출{'\n'}
                        → 다른 컴포넌트가 이벤트 감지 → 데이터 재요청
                    </code>
                </pre>

                <h4 className="text-lg font-semibold mb-2 font-gowun text-sky-600">시나리오 4: 페이지 간 이동 (캐싱 활용)</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 text-sm rounded-lg p-4 font-mono text-gray-800 dark:text-gray-100 overflow-x-auto">
                    <code>
                        사용자 → 대시보드 진입 → 미션 데이터 로드 (서버/브라우저 캐시){'\n'}
                        → 다른 페이지 이동 → 대시보드로 복귀{'\n'}
                        → 캐시된 데이터 즉시 반영 → 빠른 전환 경험{'\n'}
                        → (다른 기기에서 데이터 수정 시, 새로고침 시 최신 데이터 반영)
                    </code>
                </pre>
            </section>

        </div>
    );
}


{/** React query 개선 가능성 */ }
