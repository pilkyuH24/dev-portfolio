import Image from "next/image";

async function fetchProjects() {
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  const TOKEN = process.env.NOTION_TOKEN;

  const option = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
      sorts: [
        { property: "priority", direction: "descending" },
        { property: "Name", direction: "ascending" },
      ],
    }),
  };

  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      option
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(
        `Failed to fetch: ${res.status} ${res.statusText}`,
        errorDetails
      );
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
}

export default async function Projects() {
  const data = await fetchProjects();

  if (!data) {
    return <h1 className="text-red-500">Error loading projects</h1>;
  }

  return (
    <div className="p-8 text-center dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Projects</h1>

      <div className="space-y-16 max-w-6xl mx-auto">
        {data.results?.map((project, index) => {
          const demoUrl = project.properties.demo.rich_text[0]?.href || null;
          return (
            <div
              key={project.id}
              className={`flex flex-col md:flex-row items-start text-left ${
                index % 2 === 1 ? "md:ml-16" : ""
              }`}
            >
              {/* Left side: Image and Project Name */}
              <div
                className={`md:w-1/3 mb-4 md:mb-0 ${
                  index % 2 === 1 ? "order-last md:order-first" : ""
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
                      src={
                        project.cover.external?.url || project.cover.file?.url
                      }
                      alt={project.properties.Name.title[0]?.text.content}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
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
                  className="text-2xl font-semibold mt-4 dark:text-white text-center block hover:underline"
                >
                  {project.properties.Name.title[0]?.text.content}
                </a>
              </div>

              {/* Right side: Project Details */}
              <div className="md:w-2/3 px-8 space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {project.properties.Description.rich_text[0]?.text.content}
                </p>

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

                {/* GitHub link */}
                {project.properties.Github?.url && (
                  <div className="mt-8">
                    <a
                      href={project.properties.Github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      GitHub Link
                    </a>
                  </div>
                )}
                {/* Blog link */}
                {project.properties.Blog?.url && (
                  <div className="mt-8">
                    <a
                      href={project.properties.Blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      Blog Link
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Helper function to map Notion color names to CSS colors
 */
function mapNotionColor(notionColor) {
  const notionToCSSColors = {
    default: "#E5E5E5", // Default gray
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
