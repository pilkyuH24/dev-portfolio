import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor"; 

export default function AuthSection() {
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
        <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">[...nextauth] 라우트 구성</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
          NextAuth는 <code>[...nextauth]</code>와 같은 catch-all 라우트를 통해 인증 핸들러를 구현합니다. 이 방식을 통해 <code>/api/auth/*</code> 하위 경로에 대한 처리를 모두 하나의 파일에서 담당할 수 있습니다.
        </p>
        <CodeMirrorEditor
          code={`// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };`}
        />
      </section>

      <section id="section-1-4" className="mb-12 scroll-mt-24">
        <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">인증 로직 분리 (lib/auth.ts)</h3>
        <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
          인증 관련 로직을 <code>lib/auth.ts</code>로 분리한 이유는 다음과 같습니다:
        </p>
        <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
          <li>SSR 환경에서도 <code>getServerSession(authOptions)</code>을 재사용할 수 있도록 하기 위해</li>
          <li>인증 설정을 클라이언트 및 서버 양쪽에서 공유하기 위해</li>
          <li>구성 복잡도를 낮추고 유지보수성을 높이기 위해</li>
        </ul>

        <CodeMirrorEditor
          code={`// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) throw new Error("No profile");

      await prisma.user.upsert({
        where: { email: profile.email },
        create: { email: profile.email, name: profile.name ?? "USER" },
        update: { name: profile.name },
      });

      return true;
    },
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
      });

      if (user) {
        session.user.id = user.id;
        session.user.points = user.points;
      }

      return session;
    },
  },
};`}
        />
      </section>
      <section id="section-1-5" className="mb-12 scroll-mt-24">
  <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">사용자 세션 타입 확장</h3>
  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
    NextAuth의 기본 세션 타입에는 <code>user</code> 객체가 존재하지만, 추가적인 사용자 정보를 사용하려면 타입 확장이 필요합니다.
    예를 들면 사용자 <code>id</code>와 <code>points</code>등을 세션에 포함시키기 위해서는 타입 선언을 재정의해서 사용합니다.
  </p>
  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
    이를 위해 <code>types/next-auth.d.ts</code> 파일을 생성하고, <code>declare module</code>을 사용하여 세션 타입을 커스터마이징하였습니다.
  </p>

  <CodeMirrorEditor
    code={`// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null; 
      points?: number;  
    };
  }
}`}
  />
</section>
<section id="section-1-6" className="mb-12 scroll-mt-24">
  <h3 className="text-xl font-bold mb-2 font-gowun underline decoration-sky-500">인증 미들웨어 구성</h3>
  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
    Next.js와 NextAuth에서는 <strong>middleware</strong>를 활용하여 인증이 필요한 경로에 대해 사전 처리를 할 수 있습니다. 
    이 프로젝트에서는 <code>middleware.ts</code> 파일을 루트 디렉토리에 생성하여 구성했습니다.
  </p>

  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
    기본적으로 <code>next-auth/middleware</code>를 사용하며, 사용자가 인증되지 않은 상태로 보호된 경로에 접근할 경우 로그인 페이지로 리다이렉트됩니다.
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
    위 코드에서 사용된 <code>matcher</code>는 특정 경로에만 미들웨어를 적용하기 위한 설정입니다. 
    <strong>정규 표현식</strong>을 사용하여 다음과 같은 경로를 제외하고 인증을 요구합니다:
  </p>

  <ul className="list-disc list-inside ml-4 text-lg text-gray-900 dark:text-gray-200 font-gowun">
    <li><code>/</code> (루트 페이지)</li>
    <li><code>/api</code> (API 요청은 미들웨어에서 제외하고 개별 보호)</li>
    <li><code>/_next</code> (Next.js 내부 리소스)</li>
    <li><code>/favicon.ico</code> 및 <code>/public</code> 정적 리소스</li>
  </ul>

  <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-2">
    따라서 위 설정은 로그인하지 않은 사용자가 <code>/dashboard</code>, <code>/missions</code>, <code>/profile</code> 등에 접근 시 자동으로 로그인 페이지로 리다이렉트되도록 합니다.
  </p>
</section>

    </div>
  );
}
