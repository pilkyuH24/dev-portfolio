import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function ProfileSectionV2() {
    return (
        <div className="mb-32">
            <section id="section-6-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">사용자 프로필 관리</h2>
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">프로필 페이지 구성</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    프로필 페이지는 사용자의 기본 정보와 획득한 배지를 표시하고 계정 관리 기능을 제공합니다.
                </p>
            </section>

            <section id="section-6-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">배지 데이터 관리</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    사용자 배지는 API 엔드포인트를 통해 가져옵니다. 배지 API는 사용자 인증을 확인한 후 
                    Prisma를 사용하여 데이터베이스에서 사용자와 연결된 배지를 조회합니다. 이 과정에서 배지의 
                    상세 정보도 함께 가져와 사용자에게 표시합니다. 
                </p>
            </section>

            <section id="section-6-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">계정 삭제 API 구현</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    계정 삭제 API는 사용자 인증을 확인한 후 Prisma 트랜잭션을 사용하여 사용자 데이터를 순차적으로 삭제합니다.
                    트랜잭션을 사용하여 데이터 삭제 과정에서 오류가 발생할 경우 모든 변경사항이 롤백되도록 구현했습니다.
                </p>
                <CodeMirrorEditor
                    code={`// app/api/user/delete/route.ts
export async function DELETE() {
  ...

    // 트랜잭션을 사용한 사용자 데이터 삭제
    // 순서: mission logs → badges → missions → user account
    await prisma.$transaction(async (tx) => {
      await tx.userMissionLog.deleteMany({
        where: {
          userMission: {
            userId: userId
          }
        }
      });

      await tx.userBadge.deleteMany({
        where: { userId }
      });

      await tx.userMission.deleteMany({
        where: { userId }
      });

      await tx.user.delete({
        where: { id: userId }
      });
    });

    return NextResponse.json({ success: true, message: "Account successfully deleted." });
  } catch (error) {
    ...
  }
}`}
                />
                <p className="mt-2 text-sm text-gray-900 dark:text-gray-200 font-gowun">
                    (향후 사용자의 데이터 통계 시각화를 구체화할 페이지이기도 합니다.)
                </p>
            </section>

        </div>
    );
}
