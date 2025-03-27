//projects.jsx
import ProjectsClient from './components/ProjectsClient';

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

  return <ProjectsClient projects={data.results} />;
}
