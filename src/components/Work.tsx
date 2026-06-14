import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { workData } from "../util/Data"; // 1. Import your data
import { Link } from "react-router-dom";

const Work = () => {
  const loopedWorkData = [...workData, ...workData];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <Link
            className="work-cta"
            to="/Projects"
            data-cursor="disable"
          >
            See All Projects
          </Link>
        </div>

        <div className="work-marquee" aria-label="Projects carousel">
          <div className="work-track">
            {loopedWorkData.map((project, index) => (
              <div className="work-box" key={`${project.id}-${index}`}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{(index % workData.length) + 1}</h3>

                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>

                <WorkImage
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  tools={project.tools}
                  image={project.image}
                  alt={project.alt || project.title}
                  video={project.video}
                  link={project.link}
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