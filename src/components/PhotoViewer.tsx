import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import "./styles/PhotoViewer.css";

export interface ViewerPhoto {
  src: string;
  alt: string;
  caption: string;
}

interface PhotoViewerProps {
  photos: ViewerPhoto[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

// Full-screen photo viewer. Portalled to <body>: #smooth-content's transform
// would otherwise trap a position: fixed overlay inside the scrolling page.
const PhotoViewer = ({ photos, index, onClose, onIndexChange }: PhotoViewerProps) => {
  const touchStartX = useRef<number | null>(null);
  const hasMany = photos.length > 1;
  const active = photos[index];

  const step = (delta: number) =>
    onIndexChange((index + delta + photos.length) % photos.length);

  // Freeze page scroll while open; keyboard controls
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasMany && e.key === "ArrowRight") onIndexChange((index + 1) % photos.length);
      if (hasMany && e.key === "ArrowLeft")
        onIndexChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      smoother?.paused(false);
    };
  }, [index, photos.length, hasMany, onClose, onIndexChange]);

  return createPortal(
    <div
      className="photo-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={active.caption}
      onClick={onClose}
    >
      <button
        type="button"
        className="photo-viewer-btn photo-viewer-close"
        onClick={onClose}
        aria-label="Close"
        autoFocus
      >
        <MdClose />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (!hasMany || touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        <img key={active.src} src={active.src} alt={active.alt} />
        <figcaption>
          <span>{active.caption}</span>
          {hasMany && (
            <span className="photo-viewer-count">
              {index + 1} / {photos.length}
            </span>
          )}
        </figcaption>
      </figure>

      {hasMany && (
        <>
          <button
            type="button"
            className="photo-viewer-btn photo-viewer-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            <MdArrowBack />
          </button>
          <button
            type="button"
            className="photo-viewer-btn photo-viewer-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            <MdArrowForward />
          </button>
        </>
      )}
    </div>,
    document.body
  );
};

export default PhotoViewer;
