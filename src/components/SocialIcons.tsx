import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    const items = Array.from(social.querySelectorAll("span")).map((elem) => ({
      elem,
      link: elem.querySelector("a") as HTMLElement,
      // Offset from the icon box's centre, so it stays centred at rest
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    }));

    let frame = 0;
    const updatePosition = () => {
      items.forEach((item) => {
        item.currentX += (item.targetX - item.currentX) * 0.1;
        item.currentY += (item.targetY - item.currentY) * 0.1;
        item.link.style.setProperty("--siLeft", `calc(50% + ${item.currentX}px)`);
        item.link.style.setProperty("--siTop", `calc(50% + ${item.currentY}px)`);
      });
      frame = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      items.forEach((item) => {
        // Measure live: the icons are hidden during loading and move on resize
        const rect = item.elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          item.targetX = x - rect.width / 2;
          item.targetY = y - rect.height / 2;
        } else {
          item.targetX = 0;
          item.targetY = 0;
        }
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    updatePosition();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/Damiduuofc" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/damidu-abeysinghe/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/damiduuofc"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Damidu_Abeysinghe.pdf"
        download="Damidu_Abeysinghe_Resume.pdf"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
