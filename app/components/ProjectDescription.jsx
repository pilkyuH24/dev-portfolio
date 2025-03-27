// app/components/ProjectDescription.jsx
'use client';

import { useLang } from './LanguageProvider';

export default function ProjectDescription({ project }) {
  const { lang } = useLang();
  const descriptionField = project.properties[`Description_${lang}`];
  const descriptionText = descriptionField?.rich_text[0]?.text.content || '';

  return (
    <p className={`text-gray-800 dark:text-gray-300 text-lg ${lang === "en" ? "font-zain text-[1.5rem]" : "font-gowun"}`}>
      {descriptionText}
    </p>
  );
}
