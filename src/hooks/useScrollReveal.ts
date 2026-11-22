import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLoading } from "../context/LoadingProvider";

gsap.registerPlugin(ScrollTrigger);

const START = "top 88%";

// Scroll reveals driven by data attributes:
//   data-reveal="up"        fades and rises into place
//   data-reveal="children"  each direct child rises in, staggered
//   data-reveal="image"     clip-mask opens while the image settles from a slight zoom
// Elements reveal when they scroll into view and hide again when scrolled back
// above, so the motion works in both directions. Skipped for reduced motion.
// Hidden states use opacity, not visibility: visibility: hidden would drop every
// link and button inside from the Tab order until the section had been scrolled to.
// Keyboard focus landing in a hidden element reveals it at once.
export function useScrollReveal() {
  const { isLoading } = useLoading();

  useGSAP(
    () => {
      // Wait for the loader so trigger positions are measured on the final layout
      if (isLoading) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rise = (selector: string, y: number, stagger: number) => {
          const hidden = { opacity: 0, y };
          gsap.set(selector, hidden);
          ScrollTrigger.batch(selector, {
            start: START,
            onEnter: (els) =>
              gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger, overwrite: true }),
            onLeaveBack: (els) =>
              gsap.to(els, { ...hidden, duration: 0.45, ease: "power2.in", overwrite: true }),
          });
        };

        rise('[data-reveal="up"]', 48, 0.08);
        rise('[data-reveal="children"] > *', 36, 0.07);

        const imageHidden = { opacity: 0, scale: 1.06, clipPath: "inset(14% 8% 14% 8% round 14px)" };
        gsap.set('[data-reveal="image"]', imageHidden);
        ScrollTrigger.batch('[data-reveal="image"]', {
          start: START,
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 14px)",
              duration: 1.3,
              ease: "expo.out",
              stagger: 0.1,
              overwrite: true,
            }),
          onLeaveBack: (els) =>
            gsap.to(els, { ...imageHidden, duration: 0.45, ease: "power2.in", overwrite: true }),
        });

        const shown = { opacity: 1, y: 0, duration: 0.4, overwrite: true };
        const imageShown = { ...shown, scale: 1, clipPath: "inset(0% 0% 0% 0% round 14px)" };
        const revealOnFocus = (e: FocusEvent) => {
          let el = e.target as HTMLElement | null;
          while (el && el !== document.body) {
            const parent = el.parentElement;
            const isReveal =
              el.matches('[data-reveal="up"], [data-reveal="image"]') ||
              parent?.matches('[data-reveal="children"]');
            if (isReveal && parseFloat(getComputedStyle(el).opacity) < 1) {
              gsap.to(el, el.matches('[data-reveal="image"]') ? imageShown : shown);
            }
            el = parent;
          }
        };
        document.addEventListener("focusin", revealOnFocus);

        ScrollTrigger.refresh();
        return () => document.removeEventListener("focusin", revealOnFocus);
      });
    },
    { dependencies: [isLoading] }
  );
}
