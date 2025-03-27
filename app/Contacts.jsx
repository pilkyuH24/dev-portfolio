//Contacts.jsx
import Image from 'next/image';

export default function Contact() {
  return (
    <section className="text-gray-600 dark:text-gray-100 body-font">
      <div className="container px-5 py-12 mx-auto text-center mt-32">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
          <ContactItem
            iconSrc="/gmail-icon.svg"
            title="Email"
            link="mailto:pilkyuh24@gmail.com"
            isGitHub={false}
          />
          <ContactItem
            iconSrc="/github-icon-1.svg"
            title="GitHub"
            link="https://github.com/pilkyuH24"
            isGitHub={true}
          />
          <ContactItem
            iconSrc="/linkedin-icon-2.svg"
            title="LinkedIn"
            link="https://www.linkedin.com/in/pilkyu-han-1481122b6"
            isGitHub={false}
          />
        </div>
      </div>
    </section>
  );
}

function ContactItem({ iconSrc, title, link, isGitHub }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 p-5 sm:p-8 rounded-lg bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-white/10 shadow-lg pb-3 w-56 sm:w-48 h-20 transition-transform hover:scale-105 hover:shadow-xl"
    >
      <Image
        src={iconSrc}
        alt={title}
        width={0}
        height={0}
        style={{ width: "32px", height: "auto" }}
        className={`mb-2 sm:mt-2 ${isGitHub ? 'dark:invert' : ''}`}
      />
      <span className="font-zain text-xl sm:text-xl text-gray-900 dark:text-white text-center">
        {title}
      </span>
    </a>
  );
}
