import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../../services/API";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [projecto, setProjecto] = useState("");
  const getProjectoById = async () => {
    API.get(`/projects/${id}`).then((res) => {
      setProjecto(res.data.project);
      console.log(res.data.project);
    });
  };
  useEffect(() => {
    getProjectoById();
  }, []);
  return (
    <section className="edit_project">
      <div className="project_infodetail_container">
        <div className="project_title_container">
          <h2>{projecto.projectTitle}</h2>
        </div>
        <div className="project_content_container">
          <h4>Description: {projecto.projectDescription}</h4>
        </div>
        <div className="project_info_container">
          <div className="project_img_container">
            <img src={projecto.projectImage} alt={projecto.projectTitle} />
          </div>
        </div>
        <div className="project_content_container">
          <h4>Videos: </h4>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${projecto.projectVideo}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
