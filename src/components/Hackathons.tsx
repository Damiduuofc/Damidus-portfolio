import { useState } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
import "./styles/Hackathons.css";
import PhotoViewer from "./PhotoViewer";
import { hackathonData, HackathonPhoto } from "../util/hackathonData";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

type Viewer = { photos: HackathonPhoto[]; index: number } | null;

const Hackathons = () => {
  const [viewer, setViewer] = useState<Viewer>(null);
  return (
    <section className="hackathons-section section-container" id="hackathons">
      <header className="hack-header" data-reveal="children">
        <h2>
          Hackathons <span>& Competitions</span>
        </h2>
        <p>
          Design sprints and competitions where I team up, build fast, and put
          ideas in front of judges.
        </p>
      </header>

      <ol className="hack-list">
        {hackathonData.map((item, index) => (
          <li key={item.id} className="hack-item">
            <aside className="hack-aside" data-reveal="up">
              <span className="hack-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="hack-year">{item.year}</span>
              <span className="hack-result">{item.result}</span>
              <span className="hack-event-short">{item.event}</span>
            </aside>

            <div className="hack-body">
              <h3 className="hack-title" data-reveal="up">{item.event}</h3>
              <p className="hack-fullname" data-reveal="up">{item.fullName}</p>
              <p className="hack-organizer" data-reveal="up">{item.organizer}</p>

              <p className="hack-description" data-reveal="up">{item.description}</p>

              <div className="hack-team" data-reveal="up">
                <div className="hack-avatars" aria-hidden="true">
                  {["Damidu Abeysinghe", ...item.teammates].map((name) => (
                    <span key={name}>{initials(name)}</span>
                  ))}
                </div>
                <p>
                  <strong>Team {item.teamName}</strong>
                  <br />
                  Damidu Abeysinghe, {item.teammates.join(", ")}
                </p>
              </div>

              <ul className="hack-tags" data-reveal="up" aria-label="Skills">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <div className="hack-gallery">
                {item.photos.map((photo, photoIndex) => (
                  <button
                    key={photo.src}
                    type="button"
                    className="hack-photo" data-reveal="image"
                    onClick={() => setViewer({ photos: item.photos, index: photoIndex })}
                    aria-label={`View photo: ${photo.caption}`}
                    data-cursor="disable"
                  >
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                    <span className="hack-photo-caption">
                      {photo.caption}
                      <MdOutlineZoomOutMap />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </li>
        ))}
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

export default Hackathons;
