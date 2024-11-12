import Image from 'next/image';

export default function Contact() {
  return (
    <section className="text-gray-600 dark:text-gray-100 body-font">
      <div className="container px-5 py-12 mx-auto text-center">
        {/* Header */}
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600 dark:text-gray-300 mb-12">
          Feel free to reach out via email or connect on GitHub and LinkedIn. I’d love to hear from you!
        </p>

        {/* Contact Information */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          {/* Email */}
          <ContactItem
            iconSrc="/gmail-icon.svg"
            title="Email"
            link="mailto:pilkyuh24@gmail.com"
            isGitHub={false}
          />
          {/* GitHub */}
          <ContactItem
            iconSrc="/github-icon-1.svg"
            title="GitHub"
            link="https://github.com/yourusername"
            isGitHub={true}
          />
          {/* LinkedIn */}
          <ContactItem
            iconSrc="/linkedin-icon-2.svg"
            title="LinkedIn"
            link="https://linkedin.com/in/yourusername"
            isGitHub={false}
          />
        </div>
      </div>
    </section>
  );
}

// Reusable Contact Item Component
function ContactItem({ iconSrc, title, link, isGitHub }) {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 p-8 rounded-lg bg-white dark:bg-transparent shadow-lg w-64 h-32">
      <Image
        src={iconSrc}
        alt={title}
        width={48}
        height={48}
        className={`mb-4 ${isGitHub ? 'dark:invert' : ''}`}
      />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-2xl text-gray-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400"
      >
        {title}
      </a>
    </div>
  );
}
