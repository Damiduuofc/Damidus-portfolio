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
        
        <img src={props.image} alt={props.alt || "Work project"} />
        
      
      </a>
    </div>
  );
};

export default WorkImage;