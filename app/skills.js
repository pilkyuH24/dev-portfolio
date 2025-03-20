import Image from 'next/image';

export default function Skills() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-8">Skills</h1>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Programming Languages */}
        <SkillRow 
          imageSrc="/logo-javascript.svg" 
          label="Programming Languages" 
          description="Experienced in C++, Python, JavaScript, and TypeScript for various types of applications and projects."
        />

        <Divider />

        {/* Version Control - Invert for dark mode */}
        <SkillRow 
          imageSrc="/github-icon-1.svg" 
          label="Version Control" 
          description="Proficient with Git and GitHub for source control, collaboration, and code management."
          invertOnDark
        />

        <Divider />

        {/* Full-Stack Development */}
        <SkillRow 
          imageSrc="/react-2.svg" 
          label="Full-Stack Development" 
          description="Skilled in React, Next.js for frontend, and Node.js, Express, PostgreSQL for backend development."
        />

        <Divider />

        {/* AI & API Integration */}
        <SkillRow 
          imageSrc="/postman.svg" 
          label="AI & API Integration" 
          description="Experienced in database integration (PostgreSQL), AI API integration (OpenAI, Hugging Face), and API development."
        />
      </div>
    </div>
  );
}

// Reusable Skill Row Component with optional dark mode invert
function SkillRow({ imageSrc, label, description, invertOnDark }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start text-left px-6 py-8 mx-auto">
      <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
        <Image 
          src={imageSrc} 
          alt={label} 
          width={64} 
          height={64} 
          className={`object-contain ${invertOnDark ? 'dark:invert' : ''}`}
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{label}</h2>
        <p className="mt-2 text-xl px-4 dark:text-white">{description}</p>
      </div>
    </div>
  );
}

// Divider Component
function Divider() {
  return <hr className="border-t my-8 mx-8" />;
}
