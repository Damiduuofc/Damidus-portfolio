import { MouseEvent } from "react";
import { MdArrowOutward } from "react-icons/md";
import { WorkItem } from "../util/Data";
import "./styles/ProjectCard.css";

type ProjectCardProps = {
  project: WorkItem;
  index: number;
  hidden?: boolean;
};

// Track the pointer so the card's spotlight glow follows it
const handleMove = (e: MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const ProjectCard = ({ project, index, hidden }: ProjectCardProps) => {
  const tools = project.tools
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const number = String(index + 1).padStart(2, "0");

  const Wrapper = project.link ? "a" : "div";
  const linkProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        tabIndex: hidden ? -1 : undefined,
      }
    : {};

  return (
    <article
      className="pcard"
      onMouseMove={handleMove}
      aria-hidden={hidden || undefined}
    >
      <Wrapper className="pcard-link" data-cursor="disable" {...linkProps}>
        <div className="pcard-media">
          <img
            src={project.image}
            alt={project.alt || project.title}
            width={project.width}
            height={project.height}
            loading="lazy"
            decoding="async"
          />
          <span className="pcard-badge">{project.category}</span>
          <span className="pcard-num">{number}</span>
        </div>

        <div className="pcard-body">
          <h3 className="pcard-title">{project.title}</h3>
          <ul className="pcard-tags" aria-label="Tools and features">
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>

        {project.link && (
          <div className="pcard-footer">
            <span>View project</span>
            <span className="pcard-arrow" aria-hidden="true">
              <MdArrowOutward />
            </span>
          </div>
        )}
      </Wrapper>
    </article>
  );
};

export default ProjectCard;
