import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ArtistCard.css";
import Button from "../Buttons/Button";

const ArtistCard = ({ user }) => {
  const [Encuesta, setEncuesta] = useState("");
  let navigate = useNavigate();

  return (
    <div className="card-container">
      <article>
        {" "}
        {user.avatar != undefined ? (
          <div>
            <img src={user.avatar} alt={user.username} className="imagen" />
          </div>
        ) : (
          <div>
            <img
              src="https://cdn3.iconfinder.com/data/icons/rcons-user-profession/32/designer-512.png"
              alt={user.username}
            />
          </div>
        )}
      </article>
      <h1 className="bold-text">
        {user.username} <span className="normal-text">{user.location}</span>
      </h1>
      <h2 className="normal-text">{user.userType}</h2>
      <div className="divboton">
        <Button
          buttonStyle="artist"
          buttonSize="diminute"
          type="button"
          className="buttondetail"
          onClick={() => navigate(`/artists/${user.username}`)}
        >
          Check profile
        </Button>
      </div>
      <div className="social-container">
        <div className="social-element">
          <a href={user.website} className="sm-link" target="_blank">
            <img src="/assets/web.png" alt="Twitter" />
          </a>
        </div>
        <div className="social-element">
          <a href={user.twitter} className="sm-link" target="_blank">
            <img src="/assets/twitter.png" alt="Twitter" />
          </a>
        </div>
        <div className="social-element">
          <a href={user.linkedin} className="sm-link" target="_blank">
            <img src="/assets/linkedin.png" alt="Twitter" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;

/*return (
    <figure className="artistcard">
      <h4 className="username">{user.username}</h4>
      <div>
        {" "}
        {user.avatar != undefined ? (
          <div>
            <img src={user.avatar} alt={user.username} />
          </div>
        ) : (
          <div>
            <img
              src="https://cdn3.iconfinder.com/data/icons/rcons-user-profession/32/designer-512.png"
              alt={user.username}
            />
          </div>
        )}
      </div>
      <div><h5 className="rol">I am a {user.userType}</h5></div>
      <div className="divboton">
        
        <button
          type="button"
          className="buttondetail"
          onClick={() => navigate(`/artists/${user.username}`)}
        >
          See my profile
        </button>
      </div>
      {user ? (
        <>
          <div className="buttonencuesta">
            <div>
              <button className="button-29" onClick={() => setEncuesta("+1")}>
                👍
              </button>

              <button className="button-29" onClick={() => setEncuesta("-1")}>
                👎
              </button>
            </div>
            <div>
              <p>{Encuesta} </p>
            </div>
          </div>
        </>
      ) : null}
    </figure>
  );
};
*/
