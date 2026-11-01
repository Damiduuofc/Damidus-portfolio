import { useState } from "react";
import "./styles/Publications.css";
import { publicationsData } from "../util/publicationData";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdAdd, MdArrowOutward, MdCheck, MdContentCopy, MdOutlineZoomOutMap } from "react-icons/md";
import PhotoViewer, { ViewerPhoto } from "./PhotoViewer";

// "International Research Conference ... (NPAIRC)" -> "NPAIRC"
const venueShort = (name: string) => name.match(/\(([^)]+)\)/)?.[1] ?? name;

const Publications = () => {
  const [expandedAbstract, setExpandedAbstract] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewer, setViewer] = useState<{ photos: ViewerPhoto[]; index: number } | null>(null);

  const toggleAbstract = (id: string) => {
    setExpandedAbstract((prev) => (prev === id ? null : id));
  };

  const copyBibtex = async (id: string, bibtex: string) => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard unavailable (insecure context / denied); fail silently
    }
  };

  return (
    <section className="publications-section section-container" id="publications">
      <header className="pub-header">
        <h2>
          Research <span>& Publications</span>
        </h2>
        <p>
          Peer-reviewed work in artificial intelligence, edge computing, and
          automated surveillance for proactive security.
        </p>
      </header>

      <ol className="pub-list">
        {publicationsData.map((pub, index) => {
          const isOpen = expandedAbstract === pub.id;
          const year = pub.publicationDate.split(" ").pop();

          return (
            <li key={pub.id} className="pub-item">
              <aside className="pub-aside">
                <span className="pub-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="pub-year">{year}</span>
                <span className="pub-kind">{pub.status}</span>
                <span className="pub-venue-short">{venueShort(pub.conferenceName)}</span>
                {pub.paperId && <span className="pub-paper-id">Paper {pub.paperId}</span>}
              </aside>

              <div className="pub-body">
                <h3 className="pub-title">{pub.title}</h3>

                <p className="pub-authors">
                  {pub.authors.map((author, idx) => (
                    <span key={author.name}>
                      <span className={author.isMainAuthor ? "pub-author-me" : undefined}>
                        {author.name}
                      </span>
                      {idx < pub.authors.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                <p className="pub-venue">
                  {pub.conferenceName} · {pub.publicationDate}
                  <br />
                  {pub.institution}, {pub.country}
                </p>

                <p className="pub-overview">{pub.overview}</p>

                {pub.photos && (
                  <div className="pub-photos">
                    {pub.photos.map((photo, photoIndex) => (
                      <button
                        key={photo.src}
                        type="button"
                        className="pub-photo"
                        onClick={() => setViewer({ photos: pub.photos!, index: photoIndex })}
                        aria-label={`View photo: ${photo.caption}`}
                        data-cursor="disable"
                      >
                        <img src={photo.src} alt={photo.alt} loading="lazy" />
                        <span className="pub-photo-caption">
                          {photo.caption}
                          <MdOutlineZoomOutMap />
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <dl className="pub-highlights">
                  {pub.highlights.map((highlight) => (
                    <div key={highlight.title} className="pub-highlight">
                      {highlight.metric && <dt>{highlight.metric}</dt>}
                      <dd>
                        <strong>{highlight.title}</strong>
                        {highlight.description}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="pub-actions">
                  <button
                    type="button"
                    className={`pub-action ${isOpen ? "is-open" : ""}`}
                    onClick={() => toggleAbstract(pub.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${pub.id}-abstract`}
                    data-cursor="disable"
                  >
                    Abstract <MdAdd className="pub-action-icon" />
                  </button>
                  <button
                    type="button"
                    className="pub-action"
                    onClick={() => copyBibtex(pub.id, pub.bibtex)}
                    data-cursor="disable"
                  >
                    {copiedId === pub.id ? (
                      <>
                        Copied <MdCheck className="pub-action-icon" />
                      </>
                    ) : (
                      <>
                        Cite <MdContentCopy className="pub-action-icon" />
                      </>
                    )}
                  </button>
                  {pub.doiLink && (
                    <a className="pub-action" href={pub.doiLink} target="_blank" rel="noreferrer" data-cursor="disable">
                      DOI <MdArrowOutward className="pub-action-icon" />
                    </a>
                  )}
                  {pub.pdfLink && (
                    <a className="pub-action" href={pub.pdfLink} target="_blank" rel="noreferrer" data-cursor="disable">
                      PDF <MdArrowOutward className="pub-action-icon" />
                    </a>
                  )}
                  <a
                    className="pub-action"
                    href={`mailto:${pub.contactEmail}?subject=${encodeURIComponent(`Inquiry: ${pub.title}`)}`}
                    data-cursor="disable"
                  >
                    Contact author <MdArrowOutward className="pub-action-icon" />
                  </a>
                </div>

                <div
                  id={`${pub.id}-abstract`}
                  className={`pub-abstract ${isOpen ? "is-open" : ""}`}
                  onTransitionEnd={(e) => {
                    if (e.target === e.currentTarget) ScrollTrigger.refresh();
                  }}
                >
                  <div className="pub-abstract-inner">
                    <p>{pub.abstract}</p>
                  </div>
                </div>

                <ul className="pub-keywords" aria-label="Keywords">
                  {pub.keywords.map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      {viewer && (
        <PhotoViewer
          photos={viewer.photos}
          index={viewer.index}
          onClose={() => setViewer(null)}
          onIndexChange={(index) => setViewer({ ...viewer, index })}
        />
      )}
    </section>
  );
};

export default Publications;
