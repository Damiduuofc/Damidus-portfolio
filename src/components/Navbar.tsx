import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "./styles/Navbar.css";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#publications", label: "Publications" },
  { href: "#hackathons", label: "Hackathons" },
  { href: "#contact", label: "Contact" },
];

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Freeze page scroll behind the mobile menu; Escape closes it
  useEffect(() => {
    const activeSmoother = ScrollSmoother.get();
    if (!menuOpen) return;
    activeSmoother?.paused(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      activeSmoother?.paused(false);
    };
  }, [menuOpen]);

  useGSAP(() => {
    let activeSmoother = ScrollSmoother.get();
    if (!activeSmoother) {
      activeSmoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        // 1:1 wheel distance with a short glide; higher values feel heavy
        smooth: 1,
        speed: 1,
        effects: false,
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
    setMenuOpen(false);

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
    setMenuOpen(false);

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
          href="mailto:damiduofc@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          damiduofc@gmail.com
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                data-href={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <HoverLinks text={link.label.toUpperCase()} />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
      </header>

      {/* Lives outside .header: its transform would trap a fixed overlay */}
      <nav
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile"
      >
        <ol className="mobile-menu-links">
          {navLinks.map((link, index) => (
            <li key={link.href} style={{ transitionDelay: menuOpen ? `${0.08 + index * 0.05}s` : "0s" }}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ol>

        <div className="mobile-menu-footer">
          <a href="mailto:damiduofc@gmail.com">damiduofc@gmail.com</a>
          <a href="/Damidu_Abeysinghe.pdf" download="Damidu_Abeysinghe_Resume.pdf">
            Download résumé
          </a>
          <div className="mobile-menu-social">
            <a href="https://github.com/Damiduuofc" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/damidu-abeysinghe/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/damiduuofc"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </nav>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
