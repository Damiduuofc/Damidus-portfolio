import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Extracted constants for easier configuration
const TOGGLE_ACTIONS = "play pause resume reverse";

export default function initTextAnimations() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Use gsap.matchMedia for automatic responsive setup and cleanup (GSAP 3.11+)
  const mm = gsap.matchMedia();

  // This replaces your manual `if (innerWidth < 900) return;`
  // It automatically sets up animations above 900px and cleans them up below 900px.
  mm.add("(min-width: 900px)", () => {
    
    // Determine start position based on exact width at the time of execution
    const isDesktop = window.innerWidth > 1024;
    const triggerStart = isDesktop ? "top 60%" : "20% 60%";

    // gsap.utils.toArray is cleaner than document.querySelectorAll
    const paras = gsap.utils.toArray<HTMLElement>(".para");
    const titles = gsap.utils.toArray<HTMLElement>(".title");

    paras.forEach((para) => {
      para.classList.add("visible");

      gsap.fromTo(
        para,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            // Added a fallback to `para` just in case the parent structure changes
            trigger: para.parentElement?.parentElement || para, 
            toggleActions: TOGGLE_ACTIONS,
            start: triggerStart,
          },
        }
      );
    });

    titles.forEach((title) => {
      gsap.fromTo(
        title,
        { autoAlpha: 0, y: 80, rotate: 10 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title.parentElement?.parentElement || title,
            toggleActions: TOGGLE_ACTIONS,
            start: triggerStart,
          },
        }
      );
    });
  });

  // Optional: Only needed if you are manually calling this outside of matchMedia limits
  ScrollTrigger.refresh();
}