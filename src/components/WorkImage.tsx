import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { WorkItem } from "../util/Data";
const WorkImage = (props: WorkItem) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleMouseEnter = async () => {
    setIsHovered(true);

    // OPTIMIZATION: Only fetch if we have a video prop AND we haven't fetched it yet.
    if (props.video && !videoUrl) {
      try {
        const response = await fetch(props.video);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Failed to load video:", error);
      }
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        target="_blank"
        rel="noopener noreferrer" // Security best practice when using target="_blank"
        data-cursor="disable"
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        
        <img src={props.image} alt={props.alt || "Work project"} />
        
        {/* Only render the video tag if hovered AND the URL has successfully loaded */}
        {isHovered && videoUrl && (
          <video src={videoUrl} autoPlay muted playsInline loop></video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;