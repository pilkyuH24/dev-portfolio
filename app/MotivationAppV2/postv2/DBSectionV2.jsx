import { React, useState } from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function DBSectionV2() {
    const [isSeedOpen, setIsSeedOpen] = useState(false);

    return (
        <div className="mb-32">
            <section id="section-2-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">데이터베이스</h2>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    본 프로젝트는 <strong>Railway</strong> 플랫폼을 사용하여 <strong>PostgreSQL</strong> 데이터베이스를 호스팅하고 있습니다. <br />
                    Railway는 개발자가 손쉽게 백엔드 인프라를 구성할 수 있도록 도와주는 플랫폼이며, PostgreSQL은 안정성과 확장성이 뛰어난 오픈소스 관계형 데이터베이스입니다.
                </p>
            </section>

            <section id="section-2-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">Prisma</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    <strong>Prisma</strong>는 TypeScript 기반의 ORM(Object-Relational Mapping) 도구로서, 다음과 같은 이유로 사용하였습니다:
                </p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    <li>타입 안정성을 기반으로 한 코드 작성이 가능</li>
                    <li>복잡한 SQL 없이 데이터베이스를 쉽게 조작</li>
                    <li>자동 마이그레이션 및 시드(seed) 데이터 삽입이 용이</li>
                </ul>
            </section>

            <section id="section-2-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">Prisma Schema 핵심 구조</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    아래는 미션, 사용자, 로그 등 사용된 <code>schema.prisma</code> 모델들의 구조입니다:
                </p>
                <CodeMirrorEditor
                    code={`// 핵심 모델 구조 (요약)

// Enums - 상태 및 유형 정의
enum Status { ONGOING, COMPLETED, FAILED }
enum MissionRepeatType { DAILY, WEEKLY, MONTHLY, CUSTOM }
enum MissionType { HEALTH, SELF_DEVELOPMENT, PRODUCTIVITY, MINDFULNESS, RELATIONSHIP }

// 사용자 모델
model User {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  name        String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt 
  
  userMissions UserMission[]
  badges       UserBadge[]
}

// 미션 기본 정보 모델
model Mission {
  id           Int         @id @default(autoincrement())
  title        String
  type         MissionType @default(SELF_DEVELOPMENT)
  description  String?
  
  UserMission  UserMission[]
}

// 사용자-미션 연결 모델 (핵심)
model UserMission {
  id          Int     @id @default(autoincrement())
  userId      Int
  missionId   Int
  user        User    @relation(fields: [userId], references: [id])
  mission     Mission @relation(fields: [missionId], references: [id])
  
  status      Status    @default(ONGOING)
  startDate   DateTime  @default(now())
  endDate     DateTime?
  
  // 미션 반복 설정
  repeatType  MissionRepeatType @default(DAILY)
  repeatDays  Boolean[] @default([false, false, false, false, false, false, false])
  
  // 로그 관계
  logs        UserMissionLog[]
  
  @@unique([userId, missionId]) // 중복 방지
}

// 미션 로그 모델
model UserMissionLog {
  id            Int         @id @default(autoincrement())
  userMissionId Int
  userMission   UserMission @relation(fields: [userMissionId], references: [id])
  
  date      DateTime // 로그 날짜
  isDone    Boolean  @default(false)
  
  @@unique([userMissionId, date]) // 같은 날 중복 로그 방지
}`}
                />
            </section>

            <section id="section-2-2.5" className="mb-12 scroll-mt-24">
                <button
                    onClick={() => setIsSeedOpen(!isSeedOpen)}
                    className="text-left w-full bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-gowun"
                >
                    <h3 className="text-xl font-bold underline decoration-sky-500">
                        {isSeedOpen ? "▼" : "▶"} Seed 스크립트 및 마이그레이션
                    </h3>
                </button>

                {isSeedOpen && (
                    <div>
                        <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">Seed 스크립트 및 마이그레이션</h3>
                        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                            Prisma를 사용하면 데이터베이스 초기화 및 샘플 데이터를 삽입하는 <strong>seed 스크립트</strong>를 정의할 수 있습니다.
                        </p>
                        <CodeMirrorEditor
                            code={`// package.json (일부)
"scripts": {
  "build": "prisma generate && next build",
  ...
},
  ...
"prisma": {
  "seed": "ts-node --compiler-options {\\"module\\":\\"CommonJS\\"} prisma/seed.ts"
},
"dependencies": { ...
`}
                        />

                        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-4">
                            명령어를 통해 데이터베이스 마이그레이션을 실행하며,
                            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                                (마이그레이션은 데이터베이스 스키마(구조)를 버전 관리하고 변경 사항을 적용하는 과정입니다.)
                            </span>
                        </p>
                        <CodeMirrorEditor
                            code={`npx prisma migrate dev --name init`} />

                        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-4">
                            명령어를 통해 초기 데이터를 삽입할 수 있습니다.
                        </p>
                        <CodeMirrorEditor
                            code={`npx prisma db seed`} />
                    </div>
                )}
            </section>

            <section id="section-2-3" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">데이터 모델링 설계 포인트</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-3">
                    본 프로젝트의 데이터베이스 설계는 다음과 같은 핵심 장점을 가지고 있습니다:
                </p>
                <ol className="list-decimal list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun space-y-2">
                    <li><strong>효율적인 관계 모델링:</strong> User와 Mission 간의 다대다 관계를 UserMission 테이블로 연결하여 유연한 미션 관리가 가능합니다.</li>
                    <li><strong>진행 상황 추적 시스템:</strong> UserMissionLog 모델을 통해 날짜별 미션 완료 여부를 추적하여 사용자의 습관 형성 과정을 효과적으로 기록합니다.</li>
                    <li><strong>유연한 반복 설정:</strong> repeatType과 repeatDays 배열을 통해 일별, 주별, 월별 등 다양한 반복 패턴을 지원합니다.</li>
                    <li><strong>중복 방지 제약조건:</strong> 사용자가 동일한 미션을 중복 선택하거나, 같은 날짜에 중복 기록이 생기는 것을 방지하는 unique 제약조건을 적용했습니다.</li>
                </ol>
            </section>
        </div>
    );
}