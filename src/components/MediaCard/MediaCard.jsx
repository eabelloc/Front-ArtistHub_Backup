import { Link, useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import "./MediaCard.css";

const MediaCard = ({ byUsername, media }) => {
  let navigate = useNavigate();

  return (
    <figure className="mediacard">
      <h4 className="title">{media.mediaTitle}</h4>
      <div className="projectcard_img_description_wrapper">
        {" "}
        {media.mediaImage != undefined ? (
          <div className="projectcard_img_container">
            <img src={media.mediaImage} alt={media.mediaTitle} />
          </div>
        ) : (
          <div className="projectcard_img_container">
            <img
              src="https://cdn3.iconfinder.com/data/icons/rcons-user-profession/32/designer-512.png"
              alt={media.mediaTitle}
            />
          </div>
        )}
        <div className="description">
          <p className="description_text">Media: {media.mediaDescription}</p>
          <p className="description_text">
            Created at: {new Date(media.createdAt).toLocaleDateString()}
          </p>
          <p className="description_text">
            Last update: {new Date(media.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div>
        <Link to={`/artists/medias/${media._id}`}>
          {" "}
          <Button buttonSize="small" buttonStyle="primary" type="button">
            See my media
          </Button>
        </Link>
      </div>
    </figure>
  );
};

export default MediaCard;
