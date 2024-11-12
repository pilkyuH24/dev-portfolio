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
          description="Experienced in C++, Python, and JavaScript for various types of applications and projects."
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

        {/* Front-End Frameworks */}
        <SkillRow 
          imageSrc="/react-2.svg" 
          label="Front-End Frameworks" 
          description="Skilled in React and Next.js for building modern, responsive user interfaces."
        />

        <Divider />

        {/* API Integration */}
        <SkillRow 
          imageSrc="/postman.svg" 
          label="API Integration" 
          description="Experienced in integrating APIs to connect frontend and backend services seamlessly."
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
        <p className="mt-2 text-xl px-4">{description}</p>
      </div>
    </div>
  );
}

// Divider Component
function Divider() {
  return <hr className="border-t my-8 mx-8" />;
}
