//About-me.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useLang } from "./components/LanguageProvider";

export default function AboutMe() {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMounted(true);

    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-center gap-4 px-4 mb-12 mt-36 sm:mt-28">
      {/* Text Section */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 space-y-6">
        <>
          {lang === "en" ? (
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 mt-14 font-zain">
              Hello, I'm Pilkyu Han
            </h1>
          ) : (
            <>
              <h1 className="sm:hidden text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8 mt-14 font-gowun">
                안녕하세요, <br /> 한필규입니다
              </h1>
              <h1 className="hidden sm:block text-5xl font-bold text-gray-900 dark:text-white mb-8 mt-14 font-gowun">
                안녕하세요, 한필규입니다
              </h1>
            </>
          )}
        </>
        <p
          className={` text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 ${
            lang === "en" ? "font-zain text-[1.4rem]" : "font-gowun text-xl"
          }`}
        >
          {lang === "en" ? (
            <>
              I'm Pilkyu Han, a UC Berkeley graduate in Electrical Engineering
              and Computer Science. <br />I enjoy building intuitive and
              meaningful applications that make people's lives a little easier.
              I'm especially interested in projects that combine creativity with
              technology.
            </>
          ) : (
            <>
              저는 UC 버클리에서 전기전자컴퓨터공학을 전공한 한필규입니다.{" "}
              <br />
              사람들의 삶을 조금 더 편리하게 만들어주는 직관적이고 실용적인
              서비스를 만드는 것을 좋아합니다. <br />
              기술과 창의성이 어우러진 프로젝트에 특히 관심이 많습니다.
            </>
          )}
        </p>
      </div>

      {/* Animation Section */}
      <div className="flex justify-center items-center lg:w-1/2">
        <dotlottie-player
          src="https://lottie.host/31d836bc-2cb3-4344-bb27-3dd5640e85bc/y9cvpHwaQA.json"
          background="transparent"
          speed="1"
          style={{ width: "65%", height: "65%" }}
          direction="1"
          mode="normal"
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
}
