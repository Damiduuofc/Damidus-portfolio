import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoother } from "../Navbar";

export function initialFX() {
  // 1. Initial DOM and State Setup
  document.body.style.overflowY = "auto";
  document.querySelector("#smooth-content")?.classList.add("main-active");

  if (smoother) {
    smoother.paused(false);
  }

  // Refresh ScrollTrigger to calculate heights correctly after the loading screen is unmounted
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);

  // 2. Master Timeline Orchestration
  // Setting defaults here saves us from writing duration/ease on every single step
  const tl = gsap.timeline({
    defaults: { duration: 1.2, ease: "power3.out" },
  });

  // 3. Chain the animations. 
  // We use absolute positioning (the last number) to match your original exact delays,
  // but keeping them in a timeline makes it globally adjustable.
  tl.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, ease: "power1.out" }, // Overrides the default ease
    0.1
  )
    .fromTo(
      [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
      { opacity: 0, y: 80, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.2 },
      0.3
    )
    .fromTo(
      ".landing-h2-info",
      { opacity: 0, y: 80, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)" },
      0.5
    )
    .fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: "power1.out" },
      0.8
    )
    .to(
      "body",
      { backgroundColor: "#0b080c", duration: 0.5 },
      1.0
    );

  // Initialize infinite loops
  loopText(".landing-h2-info", ".landing-h2-info-1");
  loopText(".landing-h2-1", ".landing-h2-2");
}

function loopText(first: string, second: string) {
  // Timeline defaults drastically clean up repetitive configurations
  gsap.timeline({ repeat: -1, defaults: { duration: 0.8 } })
    .to(first, { y: -40, opacity: 0, delay: 4 })
    .fromTo(second, { y: 40, opacity: 0 }, { y: 0, opacity: 1 })
    .to(second, { y: -40, opacity: 0, delay: 4 })
    .fromTo(first, { y: 40, opacity: 0 }, { y: 0, opacity: 1 });
}