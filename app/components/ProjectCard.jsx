// app/components/ProjectCard.jsx
"use client";

import Image from "next/image";
import ProjectDescription from "./ProjectDescription";

export default function ProjectCard({ project, index, onImageLoad }) {
  const notionPriority = project.properties.priority?.number ?? 999;

  const demoUrl = project.properties.demo.rich_text[0]?.href || null;
  const title = project.properties.Name.title[0]?.text.content;

  return (
    <div
      className={`flex flex-col md:flex-row items-start text-left ${
        index % 2 === 1 ? "md:ml-16" : ""
      }`}
    >
      {/* Left */}
      <div
        className={`md:w-1/3 mb-4 md:mb-0 ${
          notionPriority % 2 === 1 ? "order-last md:order-first" : ""
        }`}
      >
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {project.cover?.external?.url || project.cover?.file?.url ? (
            <Image
              src={project.cover.external?.url || project.cover.file?.url}
              alt={title}
              width={400}
              height={300}
              className="object-cover rounded-lg shadow-md"
              onLoad={() => {
                onImageLoad?.();
              }}
              priority
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 rounded-lg shadow-md">
              No Image
            </div>
          )}
        </a>
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-semibold mt-4 dark:text-white text-center block hover:underline font-zain"
        >
          {title}
        </a>
      </div>

      {/* Right */}
      <div className="md:w-2/3 px-8 space-y-4">
        <ProjectDescription project={project} />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.properties.Tag.multi_select.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-white"
              style={{ backgroundColor: mapNotionColor(tag.color) }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="flex flex-row mt-8 float-start gap-4">
        {/* GitHub */}
        {project.properties.Github?.url && (
          <div className="">
            <a
              href={project.properties.Github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-zain text-xl text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              GitHub Link
            </a>
          </div>
        )}

        {/* Blog */}
        {project.properties.Blog?.url && (
          <div className="">
            <a
              href={project.properties.Blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-zain text-xl text-pink-600 dark:text-pink-400 font-bold hover:underline"
            >
              Blog Link
            </a>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

function mapNotionColor(notionColor) {
  const notionToCSSColors = {
    default: "#E5E5E5",
    gray: "#9CA3AF",
    brown: "#A78B71",
    orange: "#F59E0B",
    yellow: "#FCD34D",
    green: "#34D399",
    blue: "#3B82F6",
    purple: "#A78BFA",
    pink: "#F472B6",
    red: "#EF4444",
  };

  return notionToCSSColors[notionColor] || notionToCSSColors.default;
}
