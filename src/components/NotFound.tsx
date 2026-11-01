import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { usePageMeta } from "../hooks/usePageMeta";
import "./styles/NotFound.css";

const NotFound = () => {
  usePageMeta(
    "Page not found | Damidu Abeysinghe",
    "This page doesn't exist. Head back to Damidu Abeysinghe's portfolio.",
    "/"
  );

  // Every URL is served index.html (200), so tell crawlers not to index this one
  useEffect(() => {
    const robots = document.head.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute("content") ?? "";
    robots?.setAttribute("content", "noindex");
    return () => robots?.setAttribute("content", previous);
  }, []);

  return (
    <section className="not-found">
      <p className="not-found-code">404</p>
      <h1>
        This page took a <span>wrong turn</span>
      </h1>
      <p className="not-found-text">
        The link may be broken, or the page may have moved. Everything else is
        still right where you left it.
      </p>
      <Link to="/" className="not-found-home" data-cursor="disable">
        <MdArrowBack /> Back to home
      </Link>
    </section>
  );
};

export default NotFound;
