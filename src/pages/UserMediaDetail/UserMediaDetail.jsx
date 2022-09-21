import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../../services/API";
import "./UserMediaDetail.css";
import { useForm } from "react-hook-form";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";

//TODO: PREGUNTAR SOBRE EL DAFAULTVALUES, QUE NO NOS ESTA FUNCIONANDO :/

const UserMediaDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [medio, setMedio] = useState("");
  const getMediaoById = async () => {
    API.get(`/medias/${id}`).then((res) => {
      setMedio(res.data.media);
      console.log(res.data.media);
    });
  };

  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState({
    mediaTitle: "",
    mediatDescription: "",
    mediaSpotify: "",
    mediaImage: "",
    mediaVideo: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();

  const defaultValue = {
    mediaTitle: medio.mediaTitle,
    mediaDescription: medio.mediaDescription,
    mediaSpotify: medio.mediaSpotify,
    mediaVideo: medio.mediaVideo,
  };

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("mediaTitle", data.mediaTitle);
    formData.append("mediaDescription", data.mediaDescription);
    formData.append("mediaSpotify", data.mediaSpotify);
    formData.append("mediaImage", data.mediaImage[0]);
    formData.append("mediaVideo", data.mediaVideo);

    API.patch(`/medias/${medio._id}`, formData).then((res) => {
      if (res) {
        navigate("/profile");
      }
    });
  };

  const deleteMedia = () => {
    API.delete(`/medias/${medio._id}`).then((res) => {
      if (res) {
        navigate("/profile");
      }
    });
  };

  useEffect(() => {
    getMediaoById();
  }, []);

  return (
    <section className="edit_media">
      <div className="media_detail_wrapper">
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

        <div className="media_form_container">
          <form
            className="profile_form"
            style={formStyle}
            onSubmit={handleSubmit(formSubmit)}
          >
            <h2>Edit Media</h2>
            <div className="boxuno_boxdos">
              <div className="boxuno">
                <Input
                  label={"Title"}
                  type={"text"}
                  placeholder={"mediaTitle"}
                  name={"mediaTitle"}
                  onChange={handleInputChange}
                  {...register("mediaTitle")}
                  defaultValue={defaultValue.mediaTitle}
                />
                <Input
                  label={"Description"}
                  type={"textarea"}
                  placeholder={"mediaDescription"}
                  name={"mediaDescription"}
                  onChange={handleInputChange}
                  {...register("mediaDescription")}
                  defaultValue={defaultValue.mediaDescription}
                />
                <Input
                  label={"Image"}
                  type={"file"}
                  placeholder={"mediaImage"}
                  name={"mediaImage"}
                  onChange={handleInputChange}
                  {...register("mediaImage")}
                />
                <Input
                  label={"Spotify"}
                  type={"text"}
                  placeholder={"mediaSpotify"}
                  name={"mediaSpotify"}
                  onChange={handleInputChange}
                  {...register("mediaSpotify")}
                  defaultValue={defaultValue.mediaSpotify}
                />
                <Input
                  label={"Video"}
                  type={"text"}
                  placeholder={"mediaVideo"}
                  name={"mediaVideo"}
                  onChange={handleInputChange}
                  {...register("mediaVideo")}
                  defaultValue={defaultValue.mediaVideo}
                />
              </div>
            </div>

            <Button type="submit" buttonStyle="formulary" buttonSize="medium">
              Save Changes
            </Button>
            <Button
              type="submit"
              buttonStyle="formulary"
              buttonSize="medium"
              onClick={() => deleteMedia()}
            >
              Delete Media
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserMediaDetail;

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

//UserMediaDetail
