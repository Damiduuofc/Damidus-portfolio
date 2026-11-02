import { useEffect, useRef } from "react";
import "./styles/Volunteering.css";
import { volunteeringData } from "../util/volunteeringData";

// One "lap" of the loop holds the list twice so it always overflows wide screens;
// the track renders two laps and slides by exactly one for a seamless loop.
const lap = [...volunteeringData, ...volunteeringData];

const SPEED = 60; // px per second: one whole pixel per frame at 60Hz
const REDUCED_SPEED = 15;

// Slides the strip right-to-left in whole-pixel steps. A CSS animation moves it by
// fractions of a pixel, so the logos' fine print is resampled every frame and shimmers.
function useMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;

    const speed = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? REDUCED_SPEED
      : SPEED;
    let offset = 0;
    let lapWidth = track.scrollWidth / 2;
    let paused = false;
    let visible = false;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      // Clamp so a backgrounded tab doesn't jump the strip when it comes back
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      if (!paused) {
        offset = (offset + speed * dt) % lapWidth;
        track.style.transform = `translate3d(${-Math.round(offset)}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (frame || !visible) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Only animate while the strip is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(marquee);

    const ro = new ResizeObserver(() => {
      lapWidth = track.scrollWidth / 2;
    });
    ro.observe(track);

    const pause = () => (paused = true);
    const resume = () => (paused = marquee.matches(":hover, :focus-within"));
    // Focus has not moved to the next element yet during focusout
    const resumeAfterBlur = () => requestAnimationFrame(resume);
    marquee.addEventListener("pointerenter", pause);
    marquee.addEventListener("pointerleave", resume);
    marquee.addEventListener("focusin", pause);
    marquee.addEventListener("focusout", resumeAfterBlur);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      marquee.removeEventListener("pointerenter", pause);
      marquee.removeEventListener("pointerleave", resume);
      marquee.removeEventListener("focusin", pause);
      marquee.removeEventListener("focusout", resumeAfterBlur);
    };
  }, []);

  return { marqueeRef, trackRef };
}

const Volunteering = () => {
  const { marqueeRef, trackRef } = useMarquee();

  return (
    <section className="volunteering-section section-container" id="volunteering">
      <header className="vol-header" data-reveal="children">
        <h2>
          Volunteering <span>& Leadership</span>
        </h2>
        <p>
          Clubs and communities I've designed, edited and led for, from school
          societies to university chapters.
        </p>
      </header>

      <div className="vol-marquee" data-reveal="up" ref={marqueeRef}>
        <ul className="vol-track" ref={trackRef}>
          {[...lap, ...lap].map((org, index) => {
            // Only the first copy is exposed to assistive tech and keyboard focus
            const isClone = index >= volunteeringData.length;
            return (
              <li
                key={`${org.id}-${index}`}
                className="vol-item"
                aria-hidden={isClone || undefined}
              >
                <div className="vol-card" tabIndex={isClone ? -1 : 0} data-cursor="disable">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className={org.badge ? "vol-logo-badge" : undefined}
                    draggable={false}
                  />
                  <div className="vol-details">
                    <h3>{org.name}</h3>
                    <ul>
                      {org.roles.map((role) => (
                        <li key={role.title + role.period}>
                          <span className="vol-role">{role.title}</span>
                          <span className="vol-period">{role.period}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Volunteering;
