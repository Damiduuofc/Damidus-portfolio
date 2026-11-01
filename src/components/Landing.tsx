import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MdArrowDownward, MdOutlineFileDownload } from "react-icons/md";
import { useLoading } from "../context/LoadingProvider";
import "./styles/Landing.css";

const HOLD = 3; // seconds each word stays on screen

// Shown as the pill above the greeting; set to "" to hide it
const AVAILABILITY = "Open to internships";

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

gsap.registerPlugin(ScrollTrigger);

// Avatar motion: soft reveal, slow float, a slight lean toward the pointer
// and a gentle sink as the hero scrolls away
function animateCharacter() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      full: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
      finePointer: "(hover: hover) and (pointer: fine)",
    },
    (ctx) => {
      const { full, finePointer } = ctx.conditions as Record<string, boolean>;

      gsap.fromTo(
        ".landing-character-motion",
        { autoAlpha: 0, y: full ? 40 : 0, scale: full ? 0.96 : 1, filter: full ? "blur(10px)" : "none" },
        { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: full ? 1.6 : 0.6, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(".landing-character-halo", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, delay: 0.4 });

      if (!full) return;

      // Idle float, with the floor shadow tightening as the avatar rises
      gsap.to(".landing-character-float", { y: -8, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".landing-character-shadow", {
        scaleX: 0.9,
        autoAlpha: 0.35,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".landing-character-halo", { scale: 1.06, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // Sink and fade as the hero leaves the screen
      gsap.to(".landing-character-scroll", {
        y: 120,
        scale: 0.94,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ".landing-section", start: "top top", end: "bottom top", scrub: true },
      });

      if (!finePointer) return;

      // Lean toward the pointer (a few px / degrees, eased)
      const tilt = ".landing-character-tilt";
      const toX = gsap.quickTo(tilt, "x", { duration: 0.9, ease: "power3.out" });
      const toRotY = gsap.quickTo(tilt, "rotationY", { duration: 0.9, ease: "power3.out" });
      const toRotX = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        toX(nx * 18);
        toRotY(nx * 10);
        toRotX(ny * -5);
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  );
}

const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo("#work", true, "top top");
  else document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
};

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();

  // Runs on every mount (e.g. returning from /Projects) and is reverted on
  // unmount, so the loop never targets stale nodes or stacks up
  useGSAP(
    () => {
      if (isLoading) return;
      animateCharacter();
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
            {AVAILABILITY && (
              <p className="landing-status">
                <span className="landing-status-dot" aria-hidden="true" />
                {AVAILABILITY}
              </p>
            )}
            <h2>
              <span lang="si" className="landing-si">
                ආයුබෝවන්
              </span>{" "}
              · Ayubowan, I'm
            </h2>
            <h1>
              Damidu
              <br />
              <span>Abeysinghe</span>
            </h1>
            <p className="landing-greeting-note">
              Ayubowan is the Sri Lankan greeting — “may you live long”
            </p>
            <div className="landing-cta">
              <a href="#work" className="landing-cta-primary" onClick={scrollToWork} data-cursor="disable">
                View my work <MdArrowDownward />
              </a>
              <a
                href="/Damidu_Abeysinghe.pdf"
                download="Damidu_Abeysinghe_Resume.pdf"
                className="landing-cta-secondary"
                data-cursor="disable"
              >
                Download CV <MdOutlineFileDownload />
              </a>
            </div>
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
            <div className="landing-character-halo" />
            <div className="landing-character-scroll">
              <div className="landing-character-motion">
                <div className="landing-character-shadow" />
                <div className="landing-character-tilt">
                  <div className="landing-character-float">
                    <img src="/images/character.webp" alt="" width={383} height={753} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
