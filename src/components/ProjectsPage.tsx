import { useEffect, useMemo, useState } from "react";
import { workData } from "../util/Data";
import ProjectCard from "./ProjectCard";
import "./styles/ProjectsPage.css";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ALL = "All";

const ProjectsPage = () => {
  usePageMeta(
    "All Projects | Damidu Abeysinghe",
    "Web applications, websites and UI/UX case studies by Damidu Abeysinghe, built with React, Next.js, Node.js, Express and MongoDB.",
    "/projects"
  );
  useScrollReveal();

  const [filter, setFilter] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(workData.map((p) => p.category)))],
    []
  );

  const visible = workData
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === ALL || project.category === filter);

  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="projects-page" id="projects">
      <div className="projects-glow" aria-hidden="true" />
      <div className="projects-container section-container">
        <div className="projects-header mt-5" data-reveal="up">
          <div>
            <p className="projects-eyebrow">
              <span className="projects-dot" /> Selected work · {workData.length}{" "}
              projects
            </p>
            <h1 className="projects-title mt-5">
              All <span>Projects</span>
            </h1>
          </div>
          <Link className="projects-back" to="/#work" data-cursor="disable">
            ← Back To Work
          </Link>
        </div>

        <div
          className="projects-filters"
          role="tablist"
          aria-label="Filter projects by category"
          data-reveal="up"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={`projects-filter ${filter === cat ? "is-active" : ""}`}
              onClick={() => setFilter(cat)}
              data-cursor="disable"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid" key={filter}>
          {visible.map(({ project, index }, i) => (
            <div
              className="projects-cell"
              key={project.id}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
