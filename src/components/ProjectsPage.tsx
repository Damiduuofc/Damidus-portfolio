import { useEffect } from "react";
import { workData } from "../util/Data";
import WorkImage from "./WorkImage";
import "./styles/ProjectsPage.css";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ProjectsPage = () => {
  usePageMeta(
    "All Projects | Damidu Abeysinghe",
    "Web applications, websites and UI/UX case studies by Damidu Abeysinghe, built with React, Next.js, Node.js, Express and MongoDB.",
    "/projects"
  );
  useScrollReveal();

  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="projects-page" id="projects">
      <div className="projects-container section-container">
        <div className="projects-header mt-5" data-reveal="up">
          <h1 className="projects-title mt-5">
            All <span>Projects</span>
          </h1>
          <Link className="projects-back" to="/#work" data-cursor="disable">
            Back To Work
          </Link>
        </div>

        <div className="projects-grid" data-reveal="children">
          {workData.map((project, index) => (
            <article className="projects-card" key={project.id}>
              <div className="projects-meta">
                <div className="work-title projects-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools</h4>
                <p>{project.tools}</p>
              </div>

              <WorkImage
                id={project.id}
                title={project.title}
                category={project.category}
                tools={project.tools}
                image={project.image}
                alt={project.alt || project.title}
                width={project.width}
                height={project.height}
                video={project.video}
                link={project.link}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;