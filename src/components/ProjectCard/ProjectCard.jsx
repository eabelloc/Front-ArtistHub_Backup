import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";

const ProjectCard = ({ project }) => {
  //console.log("este es el usuario", byUsername);
  let navigate = useNavigate();

  return (
    <figure className="projectcard">
      <h4 className="title">{project.projectTitle}</h4>
      <div className="projectcard_img_description_wrapper">
        {" "}
        {project.projectImage != undefined ? (
          <div className="project_card_img">
            <img src={project.projectImage} alt={project.projectTitle} />
          </div>
        ) : (
          <div className="imageniza">
            <img
              src="https://cdn3.iconfinder.com/data/icons/rcons-user-profession/32/designer-512.png"
              alt={project.projectTitle}
              className="imagencita"
            />
          </div>
        )}
        <div className="description">
          <p className="description_text">
            Project: {project.projectDescription}
          </p>
          <p className="description_text">
            Created at: {new Date(project.createdAt).toLocaleDateString()}
          </p>
          <p className="description_text">
            Last update: {new Date(project.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div>
        <Link to={`/artists/projects/${project._id}`}>
          {" "}
          <Button buttonSize="small" buttonStyle="primary" type="button">
            See my project
          </Button>
        </Link>
      </div>
    </figure>
  );
};

export default ProjectCard;
