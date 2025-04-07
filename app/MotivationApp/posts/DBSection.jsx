import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function DBSection() {
    return (
        <div className="mb-32">
            <section id="section-2-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">데이터베이스 개요</h2>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    본 프로젝트는 <strong>Railway</strong> 플랫폼을 사용하여 <strong>PostgreSQL</strong> 데이터베이스를 호스팅하고 있습니다. <br />
                    Railway는 개발자가 손쉽게 백엔드 인프라를 구성할 수 있도록 도와주는 BaaS(Backend-as-a-Service) 플랫폼이며, PostgreSQL은 안정성과 확장성이 뛰어난 오픈소스 관계형 데이터베이스입니다.
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
    아래는 미션, 사용자, 로그 등 핵심 기능 구현에 사용된 <code>schema.prisma</code> 모델들의 요약 구조입니다:
  </p>
  <CodeMirrorEditor
    code={`model User {
  id      Int    @id @default(autoincrement())
  email   String @unique
  name    String
  points  Int    @default(0)

  userMissions UserMission[]
  badges       UserBadge[]
}

model Mission {
  id           Int    @id @default(autoincrement())
  title        String
  type         MissionType
  description  String?
  rewardPoints Int    @default(0)

  UserMission UserMission[]
}

model UserMission {
  id         Int      @id @default(autoincrement())
  userId     Int
  missionId  Int
  status     Status   @default(ONGOING)
  startDate  DateTime @default(now())
  endDate    DateTime?
  repeatType MissionRepeatType @default(DAILY)
  repeatDays Boolean[] @default([false, false, false, false, false, false, false])

  mission    Mission
  logs       UserMissionLog[]
  @@unique([userId, missionId])
}

model UserMissionLog {
  id            Int      @id @default(autoincrement())
  userMissionId Int
  date          DateTime
  isDone        Boolean  @default(false)

  userMission   UserMission
  @@unique([userMissionId, date])
}`}
  />
</section>


            <section id="section-2-3" className="mb-12 scroll-mt-24">
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
            </section>

            <section id="section-2-4" className="mb-12 scroll-mt-24">
  <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">데이터베이스 설계 의도 및 반복 구조 처리</h3>
  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-4">
    본 프로젝트의 핵심 기능 중 하나는 &quot;반복적인 미션 수행 여부&quot;를 일 단위로 추적하는 것입니다. 이를 위해 <strong>매일의 수행 상태를 저장하는 로그 테이블 <code>UserMissionLog</code></strong>를 별도로 설계하였습니다.
  </p>

  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-4">
    초기에는 사용자 미션의 반복 요일 정보를 <code>Json</code> 형태로 저장하려 하였으나, 다음과 같은 이유로 <strong><code>Boolean[]</code> 배열</strong> 구조를 채택하였습니다:
  </p>

  <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
    <li>일요일(0)부터 토요일(6)까지의 각 요일을 명확히 매핑하기 위함</li>
    <li>각 요일의 활성 여부를 단순한 <code>true/false</code>로 직관적으로 처리</li>
    <li>JSON 파싱 또는 객체 순회 없이 반복 여부를 즉시 확인 가능</li>
  </ul>

  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-6 mb-2">
    예를 들어, 사용자가 월/수/금에 반복되는 미션을 선택한 경우 다음과 같이 저장됩니다:
  </p>

  <CodeMirrorEditor
    code={`repeatDays: [false, true, false, true, false, true, false] // SUN~SAT`}
  />

  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-6 mb-4">
    이와 함께 <code>UserMissionLog</code>는 각 날짜별 완료 여부를 저장하며, 중복 로그 생성을 방지하기 위해 <code>@@unique([userMissionId, date])</code> 제약 조건을 사용합니다.
    이는 하나의 미션에 대해 같은 날짜에 로그가 여러 개 생기는 것을 방지합니다.
  </p>

  <CodeMirrorEditor
    code={`model UserMissionLog {
  id            Int         @id @default(autoincrement())
  userMissionId Int
  date          DateTime
  isDone        Boolean     @default(false)

  @@unique([userMissionId, date])
}`}
  />
</section>

        </div>
    );
}
