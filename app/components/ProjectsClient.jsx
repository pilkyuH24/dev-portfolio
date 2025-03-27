// app/components/ProjectsClient.jsx
'use client';
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useLang } from './LanguageProvider';

export default function ProjectsClient({ projects }) {
  const [showFolded, setShowFolded] = useState(false);
  const [reveal, setReveal] = useState(false);

  const { lang } = useLang();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReveal(true);
    }, 4000); // match animation duration

    return () => clearTimeout(timeout);
  }, []);

  const alwaysVisible = projects.filter(
    (p) => (p.properties.priority?.number ?? 0) >= 3
  );
  const folded = projects.filter(
    (p) => (p.properties.priority?.number ?? 0) < 3
  );

  return (
    <div className="p-8 text-center dark:text-gray-100 relative">
      <h1 className= {`text-4xl font-bold mb-8 dark:text-white ${lang === "en" ? "font-zain text-[1.4rem]" : "font-gowun"}`}>{lang === "en" ? "Projects" : "프로젝트"}</h1>

      {/* Loading animation overlaid */}
      {!reveal && (
        <div className="absolute top-32 left-0 w-full flex justify-center z-10">
          <div className="terminal-loader">
            <div className="terminal-header">
              <span className="terminal-title">Loading...</span>
              <div className="terminal-controls">
                <span className="control close" />
                <span className="control minimize" />
                <span className="control maximize" />
              </div>
            </div>
            <div className="text">Loading Projects...</div>
          </div>
        </div>
      )}

      {/* Actual content always rendered, only fades in after 4s */}
      <div
        className={`space-y-16 max-w-6xl mx-auto transition-opacity duration-700 ${
          reveal ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {alwaysVisible.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showFolded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-16">
            {folded.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={alwaysVisible.length + index}
              />
            ))}
          </div>
        </div>

        {folded.length > 0 && (
          <div className="mb-12">
            <button
              onClick={() => setShowFolded(!showFolded)}
              className="px-6 py-2 border border-indigo-500 text-indigo-500 rounded-full font-semibold hover:bg-indigo-500 hover:text-white transition-colors duration-300
               dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-black"
            >
              {showFolded ? 'Hide' : 'See Small Experiments'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
