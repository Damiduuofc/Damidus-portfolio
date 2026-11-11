import { Fragment, useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLoading } from "../context/LoadingProvider";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

// Headline lines; each rises out of its own mask when the section scrolls in
const HEADLINE: React.ReactNode[] = [
  "Technology is",
  <>
    more than <span>code.</span>
  </>,
];

const PILLARS = [
  {
    title: "Technology",
    text: "Web, mobile and AI-powered products built from real requirements, not assumptions.",
  },
  {
    title: "Project Management",
    text: "Planning solutions, coordinating teams and keeping ideas moving toward delivery.",
  },
  {
    title: "Digital Innovation",
    text: "Exploring how emerging tech can solve real-world problems in practical ways.",
  },
  {
    title: "User-Centred Design",
    text: "Designing experiences around the people who actually use them.",
  },
];

const BAND = ["Research", "Hackathons", "Leadership", "Teamwork", "Innovation", "Design"];

const ease = [0.16, 1, 0.3, 1] as const;

// Splits copy into word spans for the scroll-read reveal.
// *text* renders as <strong>, _text_ as a highlighted <mark>.
const Words = ({ text }: { text: string }) => (
  <>
    {text
      .split(/(\*[^*]+\*|_[^_]+_)/)
      .filter(Boolean)
      .map((part, i) => {
        const words = part
          .replace(/^[*_]|[*_]$/g, "")
          .split(/(\s+)/)
          .map((w, j) => (!w || /^\s+$/.test(w) ? w : <span key={j} className="about-rw">{w}</span>));
        if (part.startsWith("*")) return <strong key={i}>{words}</strong>;
        if (part.startsWith("_")) return <mark key={i}>{words}</mark>;
        return <Fragment key={i}>{words}</Fragment>;
      })}
  </>
);

const COPY = [
  "My interests go beyond software development — into understanding business requirements, planning solutions, coordinating teams, and turning ideas into practical digital products.",
  "I've built web and mobile apps, information systems and AI-powered solutions, including *Care101*, a digital hospital management system that improves coordination between patients and healthcare providers.",
  "Outside the classroom I take part in research and hackathons, sharpening my communication, leadership, teamwork and technical skills along the way.",
];

const PHOTOS = [
  {
    src: "/images/about/damidu-evening.webp",
    alt: "Damidu Abeysinghe sitting on a bench in front of tall wooden slats",
  },
  {
    src: "/images/about/damidu-portrait.webp",
    alt: "Damidu Abeysinghe smiling, standing against a light wall",
  },
];

// Photo card: cycling photos and a name plate. Tilts gently toward the cursor;
// its scroll reveal lives in the section's GSAP setup.
const PosterCard = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % PHOTOS.length), 4500);
    return () => window.clearInterval(id);
  }, [reduce, active]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="about-poster"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <div className="about-poster-border">
        <div className="about-poster-frame">
          <div className="about-poster-head">
            <span>&lt;DA/&gt;</span>
            <span>About · 01</span>
          </div>

          <div className="about-poster-media">
            <AnimatePresence initial={false}>
            <motion.img
              key={active}
              src={PHOTOS[active].src}
              alt={PHOTOS[active].alt}
              width={1200}
              height={1600}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease }}
            />
            </AnimatePresence>
          </div>
          <div className="about-poster-fade" />

          <div className="about-poster-name">
            <span className="about-poster-kicker">Meet the person behind</span>
            <strong>Damidu Abeysinghe</strong>
          </div>
        </div>
      </div>

      <div className="about-poster-foot">
        <div className="about-poster-project">
          <small>Key project</small>
          <span>Care101</span>
        </div>
        <div className="about-poster-dots" role="tablist" aria-label="Choose photo">
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Photo ${i + 1}`}
              className={i === active ? "is-active" : ""}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Pillar = ({ title, text, index }: { title: string; text: string; index: number }) => {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <li className="about-pillar" onMouseMove={onMove}>
      <span className="about-pillar-num">0{index + 1}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isLoading } = useLoading();

  useGSAP(
    () => {
      if (isLoading) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Re-plays when scrolled back up past the trigger, so reveals work both ways
        const toggle = "play none none reverse";

        // Eyebrow: rule draws out, label follows
        gsap
          .timeline({ scrollTrigger: { trigger: ".about-eyebrow", start: "top 88%", toggleActions: toggle } })
          .from(".about-eyebrow-line", { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "expo.out" })
          .from(".about-eyebrow > span:not(.about-eyebrow-line)", { autoAlpha: 0, x: -12, duration: 0.6, ease: "power3.out" }, "-=0.6");

        // Headline lines slide up out of their masks, then the supporting copy fades in
        gsap.set(".about-line-inner", { yPercent: 120 });
        gsap.set(".about-intro", { autoAlpha: 0, y: 20 });
        gsap
          .timeline({ scrollTrigger: { trigger: ".about-head", start: "top 80%", toggleActions: toggle } })
          .to(".about-line-inner", { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.1 })
          .to(".about-intro", { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out" }, "-=0.7");

        // Photo: the frame opens from a small window while the photo settles from a
        // zoom, both tied to scroll position
        gsap
          .timeline({
            scrollTrigger: { trigger: ".about-poster", start: "top 92%", end: "center 55%", scrub: 0.8 },
          })
          .fromTo(
            ".about-poster-border",
            { clipPath: "inset(22% 18% 22% 18% round 24px)" },
            { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "power2.out" }
          )
          .fromTo(".about-poster-media", { scale: 1.35 }, { scale: 1, ease: "power2.out" }, 0);

        // Name plate and footer slide in once the photo is mostly open
        gsap
          .timeline({ scrollTrigger: { trigger: ".about-poster", start: "top 45%", toggleActions: toggle } })
          .from(".about-poster-name > *", { autoAlpha: 0, y: 26, duration: 0.8, ease: "expo.out", stagger: 0.08 })
          .from(".about-poster-head", { autoAlpha: 0, duration: 0.6 }, "<")
          .from(".about-poster-foot", { autoAlpha: 0, y: 14, duration: 0.7, ease: "expo.out" }, "<0.1");

        // Copy reads itself in: each word lights up as the paragraph scrolls past
        gsap.utils.toArray<HTMLElement>(".about-copy p, .about-ambition p").forEach((p) => {
          gsap.fromTo(
            p.querySelectorAll(".about-rw"),
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: p, start: "top 88%", end: "bottom 62%", scrub: 0.5 },
            }
          );
        });

        // Tags pop in one after another
        gsap.from(".about-tags li", {
          autoAlpha: 0,
          y: 18,
          scale: 0.9,
          duration: 0.6,
          ease: "back.out(1.8)",
          stagger: 0.06,
          scrollTrigger: { trigger: ".about-tags", start: "top 90%", toggleActions: toggle },
        });

        // Pillar cards tip up and rise in a wave
        const pillarsHidden = { autoAlpha: 0, y: 80, rotateX: -12, transformPerspective: 900 };
        gsap.set(".about-pillar", pillarsHidden);
        ScrollTrigger.batch(".about-pillar", {
          start: "top 88%",
          onEnter: (els) =>
            gsap.to(els, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, overwrite: true }),
          onLeaveBack: (els) => gsap.to(els, { ...pillarsHidden, duration: 0.45, ease: "power2.in", overwrite: true }),
        });

        // Band rows fade up as they enter
        gsap.from(".about-band-row span", {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".about-band", start: "top 85%", toggleActions: toggle },
        });

        // Ambition: side rule grows with scroll, label slides in
        gsap.fromTo(
          ".about-ambition-rule",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".about-ambition", start: "top 85%", end: "bottom 60%", scrub: 0.5 },
          }
        );
        gsap.from(".about-ambition-label", {
          autoAlpha: 0,
          x: -16,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: ".about-ambition", start: "top 85%", toggleActions: toggle },
        });

        // Outline band slides sideways with scroll, rows in opposite directions.
        // Positions snap to whole pixels: sub-pixel steps make the thin outlines shimmer.
        const wholePx = { x: (v: string) => `${Math.round(parseFloat(v))}px` };
        const shift = (el: HTMLElement) => -Math.round(el.scrollWidth / 4);
        const bandScroll = { trigger: ".about-band", start: "top bottom", end: "bottom top", scrub: 0.4 };
        const [rowA, rowB] = gsap.utils.toArray<HTMLElement>(".about-band-row");
        gsap.fromTo(
          rowA,
          { x: 0 },
          { x: () => shift(rowA), ease: "none", force3D: true, modifiers: wholePx, scrollTrigger: bandScroll }
        );
        gsap.fromTo(
          rowB,
          { x: () => shift(rowB) },
          { x: 0, ease: "none", force3D: true, modifiers: wholePx, scrollTrigger: { ...bandScroll } }
        );

        // Underline draws beneath the ambition line
        gsap.fromTo(
          ".about-ambition mark",
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            ease: "none",
            scrollTrigger: { trigger: ".about-ambition", start: "top 80%", end: "bottom 55%", scrub: 0.6 },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [isLoading] }
  );

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-glow" aria-hidden="true" />

      <div className="about-eyebrow">
        <span className="about-eyebrow-line" />
        <span>(01)</span>
        <span className="about-eyebrow-label">About me</span>
      </div>

      <div className="about-head">
        <h2 className="about-headline">
          {HEADLINE.map((line, i) => (
            <span key={i} className="about-line">
              <span className="about-line-inner">{line}</span>
            </span>
          ))}
        </h2>
        <p className="about-intro">
          It's about understanding problems, bringing people together, and delivering solutions that make
          a difference.
        </p>
      </div>

      <div className="about-grid">
        <PosterCard />

        <div className="about-copy">
          <p className="about-lead">
            <Words text="Hello! I'm *Damidu Abeysinghe*, an Information Systems undergraduate at General Sir John Kotelawala Defence University." />
          </p>
          {COPY.map((t) => (
            <p key={t.slice(0, 12)}>
              <Words text={t} />
            </p>
          ))}
          <ul className="about-tags">
            {["Researcher", "Hackathons", "Team Lead", "UI/UX", "AI"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="about-pillars">
        {PILLARS.map((p, i) => (
          <Pillar key={p.title} index={i} {...p} />
        ))}
      </ul>

      <div className="about-band" aria-hidden="true">
        <div className="about-band-row about-band-row--a">
          {[...BAND, ...BAND].map((w, i) => (
            <span key={i}>
              {w}
              <i>✦</i>
            </span>
          ))}
        </div>
        <div className="about-band-row about-band-row--b">
          {[...BAND, ...BAND].reverse().map((w, i) => (
            <span key={i}>
              {w}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <blockquote className="about-ambition">
        <span className="about-ambition-rule" aria-hidden="true" />
        <span className="about-ambition-label">Ambition</span>
        <p>
          <Words text="To grow into a technology leader who _bridges the gap between business and technology_ — leading teams and delivering innovative digital solutions." />
        </p>
      </blockquote>
    </section>
  );
};

export default About;
