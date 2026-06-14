import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { workData } from "../util/Data"; // 1. Import your data

// 2. Register ScrollTrigger along with useGSAP
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  useGSAP(() => {
    const workSection = document.querySelector(".work-section");
    const workFlex = document.querySelector(".work-flex");
    if (!workSection || !workFlex) {
      return;
    }

    const getTranslateX = () =>
      Math.max(0, workFlex.scrollWidth - window.innerWidth);

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: workSection,
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(workFlex, {
      x: () => -getTranslateX(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {/* 3. Map through the actual data */}
          {workData.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  {/* Keep the 01, 02, 03 numbering */}
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              
              {/* Pass the entire project object as props to WorkImage */}
              <WorkImage 
                id={project.id}
                title={project.title}
                category={project.category}
                tools={project.tools}
                image={project.image} 
                alt={project.title} 
                video={project.video}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;