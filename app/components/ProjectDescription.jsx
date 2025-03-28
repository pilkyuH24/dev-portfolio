// app/components/ProjectDescription.jsx
'use client';

import { useLang } from './LanguageProvider';

export default function ProjectDescription({ project }) {
  const { lang } = useLang();
  const descriptionField = project.properties[`Description_${lang}`];
  const descriptionText = descriptionField?.rich_text[0]?.text.content || '';

  return (
    <p className={`text-gray-800 dark:text-gray-300 ${lang === "en" ? "font-zain text-2xl" : "font-gowun text-lg"}`}>
      {descriptionText}
    </p>
  );
}
