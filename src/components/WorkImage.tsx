import { MdArrowOutward } from "react-icons/md";
import { WorkItem } from "../util/Data";
const WorkImage = (props: WorkItem) => {


  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        target="_blank"
        rel="noopener noreferrer" // Security best practice when using target="_blank"
        data-cursor="disable"
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        
        <img
          src={props.image}
          alt={props.alt || props.title}
          width={props.width}
          height={props.height}
          loading="lazy"
          decoding="async"
        />
        
      
      </a>
    </div>
  );
};

export default WorkImage;