import { useState } from "react";
import "./styles/Publications.css";
import { publicationsData } from "../util/publicationData";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MdOutlineScience,
  MdCalendarToday,
  MdSchool,
  MdEmail,

  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi2";

const Publications = () => {
  const [expandedAbstract, setExpandedAbstract] = useState<string | null>(null);


  const toggleAbstract = (id: string) => {
    setExpandedAbstract((prev) => (prev === id ? null : id));
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
  };





  return (
    <section className="publications-section section-container" id="publications">
      <div className="publications-container">
        {/* Section Header */}
        <div className="publications-header">
          <div className="pub-badge">
            <HiOutlineSparkles className="pub-sparkle" />
            <span>Academic Research & Publications</span>
          </div>
          <h2>
            Research <span>& Publications</span>
          </h2>
          <p className="publications-subheading">
            Peer-reviewed scientific contributions in artificial intelligence, edge computing,
            and automated surveillance systems for proactive security.
          </p>
        </div>

        {/* Publications List */}
        <div className="publications-list">
          {publicationsData.map((pub) => {
            const isAbstractExpanded = expandedAbstract === pub.id;

            return (
              <article key={pub.id} className="publication-card">
                <div className="pub-card-glow"></div>

                {/* Top Meta Bar */}
                <div className="pub-meta-bar">
                  <div className="pub-meta-left">
                    <span className="pub-type-badge">
                      <MdOutlineScience className="pub-icon" />
                      {pub.status}
                    </span>
                    <span className="pub-venue-badge">
                      {pub.conferenceName}
                    </span>
                  </div>

                  <div className="pub-date-badge">
                    <MdCalendarToday className="pub-icon" />
                    <span>{pub.publicationDate}</span>
                  </div>
                </div>

                {/* Paper Title */}
                <h3 className="pub-title">{pub.title}</h3>

                {/* Authors & Institutional Affiliation */}
                <div className="pub-author-affiliation">
                  <div className="pub-authors">
                    <span className="pub-author-label">Authors:</span>
                    {pub.authors.map((author, idx) => (
                      <span
                        key={author.name}
                        className={`pub-author-name ${author.isMainAuthor ? "main-author" : ""}`}
                      >
                        {author.name}
                        {author.isMainAuthor && <span className="author-tag">Lead</span>}
                        {idx < pub.authors.length - 1 && <span className="author-separator">, </span>}
                      </span>
                    ))}
                  </div>

                  <div className="pub-institution">
                    <MdSchool className="pub-icon-inst" />
                    <span>
                      {pub.department}, {pub.faculty}, {pub.institution}, {pub.country}
                    </span>
                  </div>
                </div>

                {/* Research Overview */}
                <div className="pub-overview-box">
                  <h4 className="pub-section-subtitle">Research Overview</h4>
                  <p>{pub.overview}</p>
                </div>

                {/* Core Contributions / Research Highlights */}
                <div className="pub-highlights-grid">
                  {pub.highlights.map((highlight, index) => (
                    <div key={index} className="pub-highlight-item">
                      <div className="highlight-header">
                        {highlight.metric && (
                          <span className="highlight-metric">{highlight.metric}</span>
                        )}
                        <h4>{highlight.title}</h4>
                      </div>
                      <p>{highlight.description}</p>
                    </div>
                  ))}
                </div>

                {/* Full Abstract Section (Expandable) */}
                <div className="pub-abstract-wrapper">
                  <div className="pub-abstract-header">
                    <button
                      type="button"
                      className="pub-toggle-btn"
                      onClick={() => toggleAbstract(pub.id)}
                      data-cursor="disable"
                      aria-expanded={isAbstractExpanded}
                    >
                      <span>{isAbstractExpanded ? "Hide Abstract" : "Read Full Abstract"}</span>
                      {isAbstractExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                    </button>

                    <a
                      href={`mailto:${pub.contactEmail}?subject=Inquiry: ${encodeURIComponent(pub.title)}`}
                      className="pub-email-link"
                      data-cursor="disable"
                    >
                      <MdEmail className="pub-icon" />
                      <span>Contact: {pub.contactEmail}</span>
                    </a>
                  </div>

                  {isAbstractExpanded && (
                    <div className="pub-full-abstract">
                      <h4>Abstract</h4>
                      <p>{pub.abstract}</p>
                    </div>
                  )}
                </div>

                {/* Keywords Cloud */}
                <div className="pub-keywords-container">
                  <span className="pub-keywords-label">Keywords:</span>
                  <div className="pub-keywords-list">
                    {pub.keywords.map((keyword) => (
                      <span key={keyword} className="pub-keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

            
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Publications;
