import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useGSAP(() => {
    let activeSmoother = ScrollSmoother.get();
    if (!activeSmoother) {
      activeSmoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });
      smoother = activeSmoother;
    } else {
      smoother = activeSmoother;
    }

    // Only pause if the loading screen is actively present
    const loadingEl = document.querySelector(".loading-screen");
    if (loadingEl && activeSmoother) {
      activeSmoother.scrollTop(0);
      activeSmoother.paused(true);
    } else if (activeSmoother && activeSmoother.paused()) {
      activeSmoother.paused(false);
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (targetSelector: string | number) => {
    const activeSmoother = ScrollSmoother.get() || smoother;

    if (typeof targetSelector === "number") {
      if (activeSmoother) {
        if (activeSmoother.paused()) {
          activeSmoother.paused(false);
        }
        activeSmoother.scrollTo(targetSelector, true);
      } else {
        window.scrollTo({ top: targetSelector, behavior: "smooth" });
      }
      return;
    }

    const targetEl = document.querySelector(targetSelector) as HTMLElement | null;
    if (!targetEl) return;

    if (activeSmoother) {
      if (activeSmoother.paused()) {
        activeSmoother.paused(false);
      }
      ScrollTrigger.refresh();
      activeSmoother.scrollTo(targetEl, true, "top top");
    } else {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetSelector: string
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate(`/${targetSelector}`);
      return;
    }

    // Update URL hash without forcing hard scroll
    if (window.history.pushState) {
      window.history.pushState(null, "", targetSelector);
    }

    scrollToSection(targetSelector);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    if (window.history.pushState) {
      window.history.pushState(null, "", "/");
    }

    scrollToSection(0);
  };

  // Scroll to target hash if arriving from another page or direct link
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const timer = setTimeout(() => {
        scrollToSection(location.hash);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <header className="header">
        {/* Fixed Logo Section */}
        <a
          href="/#"
          className="navbar-logo-text"
          data-cursor="disable"
          onClick={handleLogoClick}
          aria-label="Damidu Abeysinghe Home"
        >
          <span style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: "bold" }}>{"<D"}</span>
          <span style={{ color: "#c2a4ff", fontSize: "1.5rem", fontWeight: "bold" }}>{"A/>"}</span>
        </a>

        <a
          href="mailto:damiduofc@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          damiduofc@mail.com
        </a>

        <ul>
          <li>
            <a
              data-href="#about"
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a
              data-href="#work"
              href="#work"
              onClick={(e) => handleNavClick(e, "#work")}
            >
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a
              data-href="#publications"
              href="#publications"
              onClick={(e) => handleNavClick(e, "#publications")}
            >
              <HoverLinks text="PUBLICATIONS" />
            </a>
          </li>
          <li>
            <a
              data-href="#contact"
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
