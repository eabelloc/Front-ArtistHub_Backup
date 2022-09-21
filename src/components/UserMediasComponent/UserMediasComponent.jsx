import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../../services/API";
import UserMediaCard from "../UserMediaCard/UserMediaCard";
import { useContext } from "react";
import { JwtContext } from "../../contexts/jwtContext";
import Button from "../Buttons/Button";

const UserMediasComponent = ({ media }) => {
  const { user } = useContext(JwtContext);
  console.log(user);
  const [byUsername, setbyUsername] = useState("");

  const getMediasByUsername = async () => {
    API.get(`/users/medias/${user.username}`).then((res) => {
      console.log(res.data.data.medias);
      setbyUsername(res.data.data.medias);
    });
  };
  //UserMediasComponent es lo que tenemos que hacer aca,
  useEffect(() => {
    getMediasByUsername();
  }, []);

  return (
    <section className="medias">
      <div class="main">
        <div className="generalinfo">
          {user.avatar !== undefined ? (
            <img className="user-pic" src={user.avatar} alt={user.username} />
          ) : (
            <img
              src="https://cdn3.iconfinder.com/data/icons/rcons-user-profession/32/designer-512.png"
              alt="logo"
              className="user-pic"
            />
          )}
          <div class="user-main-details">
            <h1>{user.username}</h1>
            <p> I am a {user.userType}</p>
            {/*<div class="user-stats">
              <a href="/" class="stat-link">
                {" "}
                Proyects <b>3</b>
              </a>
              <a href="/" class="stat-link">
                {" "}
                Medias <b>2</b>
              </a>
              <a href="/" class="stat-link">
                {" "}
                Likes <b>360</b>
              </a>
            </div>*/}
            <div className="about">
              <h3>Projects</h3>
            </div>
          </div>
        </div>
        <div class="user-complete-details">
          <div class="user-meta-details">
            <div class="user-social">
              <p>Location: {user.location}</p>
              <p>Company: {user.company}</p>
              <p>
                {" "}
                Joined on : {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <div class="user-sm-links">
                <a href={user.website} className="sm-link" target="_blank">
                  <img src="/assets/web.png" alt="Twitter" />
                </a>
                <a href={user.twitter} className="sm-link" target="_blank">
                  <img src="/assets/twitter.png" alt="Twitter" />
                </a>
                <a href={user.linkedin} className="sm-link" target="_blank">
                  <img src="/assets/linkedin.png" alt="Twitter" />
                </a>
              </div>
            </div>
            {/*<div className="user-techstack">
              <p>
                <b>ArtStack</b>
              </p>
              <ul class="tech-list">
                <li class="tech">Noveau</li>
                <li class="tech">Plastic</li>
                <li class="tech">Techno</li>
                <li class="tech">Saxo</li>
                <li class="tech">Classic</li>
              </ul>
            </div>*/}
          </div>
          <div className="user-all-data">
            <Link to={"/profile/newmedia"}>
              <Button buttonStyle="new" buttonSize="small">
                New Media
              </Button>
            </Link>
            {byUsername.length ? (
              byUsername.map((media) => (
                <UserMediaCard media={media} key={media._id} />
              ))
            ) : (
              <p>Loading Medias...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserMediasComponent;

//UserMediasComponent

/*<Link to={"/profile/newmedia"}>
              <Button buttonStyle="new" buttonSize="small">
                New Media
              </Button>
            </Link>*/
