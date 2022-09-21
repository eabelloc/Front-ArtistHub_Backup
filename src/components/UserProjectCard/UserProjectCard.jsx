import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProjectCard.css";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";

const UserProjectCard = ({ project }) => {
  //console.log("este es el usuario", byUsername);
  let navigate = useNavigate();

  return (
    <figure className="projectcard">
      <h4 className="title">{project.projectTitle}</h4>{" "}
      <div className="projectcard_img_description_wrapper">
        {project.projectImage != undefined ? (
          <div className="projectcard_img_container">
            <img src={project.projectImage} alt={project.projectTitle} />
          </div>
        ) : (
          <div className="projectcard_img_container">
            <img
              src="https://cdn3.iconfinder.com/data/icons/rcons-user-profession/32/designer-512.png"
              alt={project.projectTitle}
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
        <Link to={`/profile/projects/${project._id}`}>
          {" "}
          <Button type="button" buttonStyle="primary" buttonSize="small">
            See my project
          </Button>
        </Link>
      </div>
    </figure>
  );
};

export default UserProjectCard;
