import { useEffect, useRef, type CSSProperties } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  // Touch screens can't hover, so a tap toggles the card open instead. Keep the
  // exact handler references so cleanup really removes them.
  useEffect(() => {
    if (!ScrollTrigger.isTouch) return;
    const bound = containerRef.current
      .filter((c): c is HTMLDivElement => !!c)
      .map((container) => {
        container.classList.remove("what-noTouch");
        const onClick = () => handleClick(container);
        container.addEventListener("click", onClick);
        return () => container.removeEventListener("click", onClick);
      });
    return () => bound.forEach((off) => off());
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title" data-reveal="up">
          W<span className="hat-h2">HAT</span>
          <span className="what-h2-line">
            I<span className="do-h2"> DO</span>
          </span>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%" aria-hidden="true">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
            tabIndex={0}
            aria-label="Develop: description and skills"
          >
            <div className="what-border1">
              <svg height="100%" aria-hidden="true">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Description</h4>
              <p>
                 Clean and efficient development focused on performance and modern design.

              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {["JavaScript", "TypeScript", "Html", "React", "Css", "Node.js", "Express.js", "Java", "MySql", "MongoDB"].map((tool, i) => (
                  <div key={tool} className="what-tags" style={{ "--i": i } as CSSProperties}>
                    {tool}
                  </div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
            tabIndex={0}
            aria-label="Design: description and skills"
          >
            <div className="what-border1">
              <svg height="100%" aria-hidden="true">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN</h3>
              <h4>Description</h4>
              <p>
                Creative and user-focused design crafted for modern, intuitive experiences.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {["Figma", "PhotoShop", "LightRoom"].map((tool, i) => (
                  <div key={tool} className="what-tags" style={{ "--i": i } as CSSProperties}>
                    {tool}
                  </div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
