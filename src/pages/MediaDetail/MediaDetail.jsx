import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../../services/API";
import "./Mediadetail.css";
import { Link } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const MediaDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [medio, setMedio] = useState("");
  const getMedioById = async () => {
    API.get(`/medias/${id}`).then((res) => {
      setMedio(res.data.media);
      console.log(res.data.media);
    });
  };
  useEffect(() => {
    getMedioById();
  }, []);
  return (
    <section className="edit_project">
      <div className="project_infodetail_container">
        <div className="project_title_container">
          <h2>{medio.mediaTitle}</h2>
        </div>
        <div className="project_content_container">
          <h4>Description: {medio.mediaDescription}</h4>
        </div>
        <div className="project_info_container">
          <div className="project_img_container">
            <img src={medio.mediaImage} alt={medio.mediaTitle} />
          </div>
        </div>
        <div className="project_content_container">
          <h4>Spotify Playlist: </h4>
          {/* <iframe style="border-radius:12px" src={medio.mediaSpotify} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>*/}
          <iframe
            src={medio.mediaSpotify}
            width="100%"
            height="380"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="project_content_container">
          <h4>Videos: </h4>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${medio.mediaVideo}`}
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

export default MediaDetail;
