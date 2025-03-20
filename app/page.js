import AboutMe from "./about-me";
import Skills from "./skills";
import Projects from "./projects";
import Contact from "./contacts";

export default function Home() {
  return (
    <div>
      {/* About Me Section */}
      <section id="about-me">
        <AboutMe />
      </section>

      {/* Skills Section */}
      <section id="skills" className="">
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Contacts Section */}
      <section id="contacts">
        <Contact />
      </section>
    </div>
  );
}
