import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";
import { API } from "../../services/API";
import { JwtContext } from "../../contexts/jwtContext";

const UserNewMedia = () => {
  const { user, setUser } = useContext(JwtContext);

  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState({
    mediaTitle: "",
    mediaDescription: "",
    mediaSpotify: "",
    mediaImage: "",
    mediaVideo: "",
  });

  const getUserByID = async () => {
    //Recuperais el usuario del contexto de la linea 12 por id OTRA VEZ
    API.get(`/users/${user._id}`).then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUserByID();
  }, []);

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append("mediaTitle", data.mediaTitle);
    formData.append("mediaDescription", data.mediaDescription);
    formData.append("mediaSpotify", data.mediaSpotify);
    formData.append("mediaImage", data.mediaImage[0]);
    formData.append("mediaVideo", data.mediaVideo);
    formData.append("users", user._id);
    API.post("/medias/create", formData).then((res) => {
      console.log("Primera Respuesta", res);
      const editUser = {
        //este user es del fetch, para hacer un
        medias: [...user.medias, res.data._id],
        projects: user.projects,
      };

      API.patch(`/users/${user._id}`, editUser).then((resUser) => {
        console.log("resUser: ", resUser);
      });
      //console.log(data);
      if (res) {
        navigate("/profile");
      }
    });
  };

  /* const defaultValues = {
    mediaTitle: media.mediaTitle,
    mediaDescription: media.mediaDescription,
    mediaSpotify: media.mediaSpotify,
    mediaVideo: media.mediaVideo,
  };
*/
  return (
    <section className="login">
      <h2 className="new_title">New Media</h2>
      <form
        className="login_form"
        style={formStyle}
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="boxuno_login">
          <Input
            label={"Title"}
            type={"text"}
            placeholder={"mediaTitle"}
            name={"mediaTitle"}
            onChange={handleInputChange}
            {...register("mediaTitle")}
            //defaultValues={defaultValues.mediaTitle}
          />
          <Input
            label={"Description"}
            type={"textarea"}
            placeholder={"mediaDescription"}
            name={"mediaDescription"}
            onChange={handleInputChange}
            {...register("mediaDescription")}
            //defaultValues={defaultValues.mediaDescription}
          />
          <Input
            label={"Spotify"}
            type={"text"}
            placeholder={"mediaSpotify"}
            name={"mediaSpotify"}
            onChange={handleInputChange}
            {...register("mediaSpotify")}
            //defaultValues={defaultValues.mediaSpotify}
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
            label={"Videos (Link)"}
            type={"text"}
            placeholder={"mediaVideo"}
            name={"mediaVideo"}
            onChange={handleInputChange}
            {...register("mediaVideo")}
            // defaultValues={defaultValues.mediaVideo}
          />
        </div>
        <div className="button_container">
          {/*<Link to={"/profile"}>*/}
          <Button type="submit" buttonStyle="formulary" buttonSize="medium">
            Create Media
          </Button>
          {/*</Link>*/}
        </div>
      </form>
    </section>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default UserNewMedia;

//UserNewMedia
