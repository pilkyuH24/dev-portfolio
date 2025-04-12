import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor"; 

export default function AuthSectionV2() {
    return (
        <div className="mb-32">
            <section id="section-1-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">NextAuth.js - Authentication 인증 시스템</h2>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    본 프로젝트는 <strong>NextAuth.js</strong>를 기반으로 Google 로그인을 제공합니다. 세션 관리는 JWT 전략을 사용하며, 사용자가 처음 로그인할 경우 데이터베이스에 자동으로 사용자 정보가 생성됩니다.
                </p>
            </section>

            <section id="section-1-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">Provider 설정</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    Google 로그인 기능을 활성화하기 위해 GoogleProvider를 등록하였습니다.
                </p>
                <CodeMirrorEditor
                    code={`// lib/auth.ts (일부)
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
],`}
                />
            </section>

            <section id="section-1-2" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">Layout에 Provider 적용</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    클라이언트 컴포넌트 내에서 세션 정보를 사용할 수 있도록 <code>SessionProvider</code>로 전체 앱을 감싸주어야 합니다.
                </p>
                <CodeMirrorEditor
                    code={`// app/provider.tsx
'use client'
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// app/layout.tsx
<body>
  <Providers>{children}</Providers>
</body>`}
                />
            </section>

            <section id="section-1-3" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">인증 미들웨어 구성</h3>
                <p className="text-base text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    Next.js와 NextAuth에서는 <strong>middleware</strong>를 활용하여 인증이 필요한 경로에 대해 사전 처리를 할 수 있습니다.
                </p>

                <CodeMirrorEditor
                    code={`// middleware.ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|public|$).*)',
  ],
};`}
                />

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    다음과 같은 경로를 제외하고 인증을 요구합니다:
                </p>

                <ul className="list-disc list-inside ml-4 text-base text-gray-900 dark:text-gray-200 font-gowun">
                    <li><code>/</code> (루트 페이지)</li>
                    <li><code>/api</code> (API 요청은 미들웨어에서 제외하고 개별 보호)</li>
                    <li><code>/_next</code> (Next.js 내부 리소스)</li>
                    <li><code>/favicon.ico</code> 및 <code>/public</code> 정적 리소스</li>
                </ul>
            </section>

            <section id="section-1-4" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">API 인증 유틸을 통한 강화된 보안</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
                    미들웨어가 클라이언트 측 라우트 보호를 제공하는 동시에, 프로젝트는 API 라우트를 위한 강력한 서버 측 인증 시스템도 구현하고 있습니다:
                </p>
                
                <CodeMirrorEditor
                    code={`// auth-utils.ts (API 라우트에서의 사용 예)
export async function authenticateUser() {
  // 세션 확인
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { 
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };
  }
  // 이메일로 사용자 찾기
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return {
      error: NextResponse.json({ message: "User not found" }, { status: 404 })
    };
  }

  return { user };
}`}
                />

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-2">
                    이러한 이중 보안 접근 방식은 다음을 보장합니다:
                </p>

                <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    <li>클라이언트 측 라우팅은 NextAuth 미들웨어로 보호됩니다</li>
                    <li>서버 API 엔드포인트는 추가 검증을 가집니다</li>
                </ul>

                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mt-2">
                    이 구현은 프론트엔드 라우트와 백엔드 API를 모두 보호하면서 깔끔하고 재사용 가능한 인증 로직을 유지하는 포괄적인 보안 시스템을 만듭니다.
                </p>
            </section>
        </div>
    );
}