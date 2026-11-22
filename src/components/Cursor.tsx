import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

// Trailing cursor blob. Only for a real mouse: on touch screens (tablets
// included) there is no pointer to follow, so it would sit stranded on screen.
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia(FINE_POINTER).matches) return;
    cursor.classList.add("cursor-enabled");

    let hover = false;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const toX = gsap.quickTo(cursor, "x", { duration: 0.1 });
    const toY = gsap.quickTo(cursor, "y", { duration: 0.1 });

    const onMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    let frame = 0;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        toX(cursorPos.x);
        toY(cursorPos.y);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    // Delegated, so elements rendered after mount still affect the cursor
    const onOver = (e: MouseEvent) => {
      const element = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!element) return;
      if (element.dataset.cursor === "icons") {
        const rect = element.getBoundingClientRect();
        cursor.classList.add("cursor-icons");
        toX(rect.left);
        toY(rect.top);
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };
    const onOut = (e: MouseEvent) => {
      const from = (e.target as HTMLElement).closest("[data-cursor]");
      const to = (e.relatedTarget as HTMLElement | null)?.closest?.("[data-cursor]");
      if (!from || from === to) return;
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cursor.classList.remove("cursor-enabled", "cursor-disable", "cursor-icons");
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} aria-hidden="true"></div>;
};

export default Cursor;
