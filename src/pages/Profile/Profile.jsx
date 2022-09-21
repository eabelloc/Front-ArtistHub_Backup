import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../../services/API";
import "./Profile.css";
import Button from "../../components/Buttons/Button";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import UserProjectsComponent from "../../components/UserProjectsComponent/UserProjectsComponent";
import UserMediasComponent from "../../components/UserMediasComponent/UserMediasComponent";
import ProjectComponent from "../../components/ProjectsComponent/ProjectsComponent";
import { useContext } from "react";
import { JwtContext } from "../../contexts/jwtContext";

const Profile = () => {
  const { user } = useContext(JwtContext);

  const [byUsername, setbyUsername] = useState(undefined);
  const [showProjects, setShowProjects] = useState(false);
  const [showMedias, setShowMedias] = useState(false);
  const [showProfile, setShowProfile] = useState(true);

  const getByUsername = async () => {
    API.get(`/users/${user._id}`).then((res) => {
      console.log(res.data.users);
      setbyUsername(res.data.users);
    });
  };
  useEffect(() => {
    getByUsername();
  });

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

      {showProfile ? <ProfileForm /> : null}
      {showProjects ? <UserProjectsComponent /> : null}
      {showMedias ? <UserMediasComponent /> : null}

      <div></div>
    </section>
  );
};

export default Profile;
