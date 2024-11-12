export default async function Projects() {
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;
    const TOKEN = process.env.NOTION_TOKEN;
  
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        page_size: 100,
        sorts: [{ property: "Name", direction: "ascending" }]
      }),
    };
  
    try {
      const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, option);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  
      const data = await res.json();
  
      // Render the UI for the Projects page
      return (
        <div className="p-8 text-center dark:text-gray-100">
          <h1 className="text-4xl font-bold mb-8 dark:text-white">Projects</h1>
          
          {/* List of projects */}
          <div className="space-y-16 max-w-6xl mx-auto">
            {data.results?.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col md:flex-row items-start md:items-center text-left ${index % 2 === 1 ? 'ml-16' : ''}`}
              >
                {/* Left side: Image and Project Name */}
                <div className={`md:w-1/3 mb-4 md:mb-0 ${index % 2 === 1 ? 'order-last md:order-first' : ''}`}>
                  {project.cover?.external?.url ? (
                    <img
                      src={project.cover.external.url}
                      alt={project.properties.Name.title[0]?.text.content}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 rounded-lg shadow-md">
                      No Image
                    </div>
                  )}
                  <h2 className="text-2xl font-semibold mt-4 dark:text-white text-center">
                    {project.properties.Name.title[0]?.text.content}
                  </h2>
                </div>
  
                {/* Right side: Project Details */}
                <div className="md:w-2/3 px-6 space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-xl font-semibold">
                    {project.properties.Description.rich_text[0]?.text.content}
                  </p>
  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.properties.Tag.multi_select.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-block rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
  
                  {/* GitHub link */}
                  {project.properties.Github.url && (
                    <a
                      href={project.properties.Github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      GitHub Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
      return <h1>Error loading projects</h1>;
    }
  }
  