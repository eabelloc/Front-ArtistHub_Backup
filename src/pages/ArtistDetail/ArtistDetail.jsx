import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../../services/API";
import "./ArtistDetail.css";
import Button from "../../components/Buttons/Button";
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";
import ProjectsComponent from "../../components/ProjectsComponent/ProjectsComponent";
import MediaComponent from "../../components/MediaComponent/MediaComponent";
import ArtitCards from "../ArtistCards/ArtistCards";

const ArtistDetail = () => {
  const [byUsername, setbyUsername] = useState(undefined);
  const [showProjects, setShowProjects] = useState(false);
  const [showMedias, setShowMedias] = useState(false);
  const [showProfile, setShowProfile] = useState(true);

  const { username } = useParams();

  const getByUsername = async () => {
    API.get(`/users/username/${username}`).then((res) => {
      console.log(res.data.data.user[0]);
      setbyUsername(res.data.data.user[0]);
    });
  };
  useEffect(() => {
    getByUsername();
  }, []);

  return (
    <section className="artistdetail">
      <nav className="navegador">
        <ul className="nav">
          <li className="nav-li">
            <Button
              onClick={() =>
                setShowProjects(false) &
                setShowMedias(false) &
                setShowProfile(true)
              }
              buttonStyle="primary"
              buttonSize="small"
            >
              Profile
            </Button>
          </li>
          <li className="nav-li">
            <Button
              onClick={() =>
                setShowProfile(false) &
                setShowMedias(false) &
                setShowProjects(true)
              }
              buttonStyle="primary"
              buttonSize="small"
            >
              Projects
            </Button>
          </li>
          <li className="nav-li">
            <Button
              onClick={() =>
                setShowProfile(false) &
                setShowProjects(false) &
                setShowMedias(true)
              }
              buttonStyle="primary"
              buttonSize="small"
            >
              Medias
            </Button>
          </li>
        </ul>
      </nav>

      {showProfile ? <ProfileComponent /> : null}
      {showProjects ? <ProjectsComponent /> : null}
      {showMedias ? <MediaComponent /> : null}

      <div></div>
    </section>
  );
};

export default ArtistDetail;
