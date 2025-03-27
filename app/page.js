import Header from "./components/Header";
import AboutMe from "./About-me";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contacts";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <Header />

      {/* About Me Section */}
      <section id="about-me">
        <AboutMe />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Contacts Section */}
      <section id="contacts">
        <Contact />
      </section>
    </div>
  );
}
