//Skills.jsx
'use client';

import Image from 'next/image';
import { useLang } from './components/LanguageProvider';
import { translations } from './lib/i18n';

export default function Skills() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="mt-12 p-8 text-center">
      <h1 className={`font-bold mb-8 ${lang === "en" ? "font-zain text-5xl" : "font-gowun text-4xl"}`}>{t.skills}</h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Programming Languages */}
        <SkillRow 
          imageSrc="/logo-javascript.svg" 
          label={t.programming}
          description={t.programmingDesc}
          lang = {lang}
        />

        <Divider />

        {/* Version Control */}
        <SkillRow 
          imageSrc="/github-icon-1.svg" 
          label={t.versionControl}
          description={t.versionControlDesc}
          invertOnDark
          lang = {lang}
        />

        <Divider />

        {/* Full-Stack Development */}
        <SkillRow 
          imageSrc="/react-2.svg" 
          label={t.fullStack}
          description={t.fullStackDesc}
          lang = {lang}
        />

        <Divider />

        {/* AI & API Integration */}
        <SkillRow 
          imageSrc="/postman.svg" 
          label={t.aiIntegration}
          description={t.aiIntegrationDesc}
          lang = {lang}
        />
      </div>
    </div>
  );
}

// Reusable Skill Row Component
function SkillRow({ imageSrc, label, description, invertOnDark, lang }) {
  return (
    <div className={`flex flex-col md:flex-row items-center md:items-start text-left px-6 py-8 mx-auto ${lang === "en" ? "font-zain text-2xl" : "font-gowun text-xl"}`}>
      <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
        <Image 
          src={imageSrc} 
          alt={label} 
          width={0} 
          height={0} 
          className={`object-contain ${invertOnDark ? 'dark:invert' : ''}`}
          style={{ width: "64px", height: "auto" }}
        />
      </div>
      <div>
        <h2 className="text-3xl font-semibold">{label}</h2>
        <p className="mt-2 px-4 dark:text-white">{description}</p>
      </div>
    </div>
  );
}

// Divider Component
function Divider() {
  return <hr className="border-t my-8 mx-8" />;
}
