// app/components/LanguageProvider.jsx
'use client';

import { useLang } from './LanguageProvider';

export default function LanguageSelector() {
  const { lang, changeLang } = useLang();

  return (
    <select value={lang} onChange={(e) => changeLang(e.target.value)} className="p-2 rounded">
      <option value="en">English</option>
      <option value="ko">한국어</option>
    </select>
  );
}
