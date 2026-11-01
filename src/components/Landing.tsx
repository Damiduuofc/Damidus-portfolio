import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoading } from "../context/LoadingProvider";
import "./styles/Landing.css";

const HOLD = 3; // seconds each word stays on screen

// Rolls two stacked words through a masked slot: out the top, in from below.
// yPercent keeps the travel equal to the word's own height at every font size.
function rollWords(first: string, second: string) {
  gsap.set(first, { yPercent: 0, autoAlpha: 1 });
  gsap.set(second, { yPercent: 100, autoAlpha: 0 });

  gsap
    .timeline({ repeat: -1, defaults: { duration: 0.7, ease: "power3.inOut" } })
    .to(first, { yPercent: -100, autoAlpha: 0 }, HOLD)
    .to(second, { yPercent: 0, autoAlpha: 1 }, "<")
    .to(second, { yPercent: -100, autoAlpha: 0 }, `+=${HOLD}`)
    // immediateRender: false — otherwise the from-state hides the first word at build time
    .fromTo(
      first,
      { yPercent: 100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, immediateRender: false },
      "<"
    )
    .set(second, { yPercent: 100 });
}

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();

  // Runs on every mount (e.g. returning from /Projects) and is reverted on
  // unmount, so the loop never targets stale nodes or stacks up
  useGSAP(
    () => {
      if (isLoading) return;
      rollWords(".landing-h2-info", ".landing-h2-info-1");
      rollWords(".landing-h2-1", ".landing-h2-2");
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container" ref={containerRef}>
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              Damidu
              <br />
              <span>Abeysinghe</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Designer</div>
              <div className="landing-h2-2">Developer</div>
            </h2>
            <h2 className="landing-info-words">
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Designer</div>
            </h2>
          </div>
          <div className="landing-character" aria-hidden="true">
            <div className="landing-character-shadow" />
            <img src="/images/character.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
