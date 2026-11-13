import "./styles/Work.css";
import ProjectCard from "./ProjectCard";
import { workData } from "../util/Data"; // 1. Import your data
import { Link } from "react-router-dom";

const Work = () => {
  const loopedWorkData = [...workData, ...workData];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header" data-reveal="up">
          <h2>
            My <span>Work</span>
          </h2>
          <Link
            className="work-cta"
            to="/projects"
            data-cursor="disable"
          >
            See All Projects
          </Link>
        </div>

        <p className="work-swipe-hint" data-reveal="up" aria-hidden="true">
          Swipe to explore <span>→</span>
        </p>

        <div className="work-marquee" data-reveal="up" aria-label="Projects carousel">
          <div className="work-track">
            {loopedWorkData.map((project, index) => (
              <div
                className={`work-box ${index >= workData.length ? "is-clone" : ""}`}
                key={`${project.id}-${index}`}
              >
                <ProjectCard
                  project={project}
                  index={index % workData.length}
                  hidden={index >= workData.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;