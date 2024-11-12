import Image from "next/image";
import AboutMe from "./about-me";
import Skills from "./skills";
import Projects from "./projects";
import Contatcts from "./contacts"

export default function Home() {
  return (
    <div>
      {/* About Me Section */}
        <AboutMe />
        <hr className="border-t my-8 mx-auto w-4/5" />

        {/* Skills Section */}
        <Skills />
        <hr className="border-t my-8 mx-auto w-4/5" />

        {/* Projects Section */}
        <Projects />
        <hr className="border-t my-8 mx-auto w-4/5" />

        {/* Contacts Section */}
        <Contatcts />

    </div>
  );
}
