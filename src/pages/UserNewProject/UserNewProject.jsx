import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";
import { API } from "../../services/API";
import { JwtContext } from "../../contexts/jwtContext";

const UserNewProject = () => {
  const { user, setUser } = useContext(JwtContext);

  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState({
    projectTitle: "",
    projectDescription: "",
    projectImage: "",
    projectVideo: "",
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
    formData.append("projectTitle", data.projectTitle);
    formData.append("projectDescription", data.projectDescription);
    formData.append("projectImage", data.projectImage[0]);
    formData.append("projectVideo", data.projectVideo);
    formData.append("users", user._id);
    API.post("/projects/create", formData).then((res) => {
      console.log("Primera Respuesta", res);
      const editUser = {
        //este user es del fetch, para hacer un
        projects: [...user.projects, res.data._id],
        medias: user.medias,
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

  return (
    <section className="login">
      <h2 className="new_title">New Project</h2>
      <form
        className="login_form"
        style={formStyle}
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="boxuno_login">
          <Input
            label={"Title"}
            type={"text"}
            placeholder={"projectTitle"}
            name={"projectTitle"}
            onChange={handleInputChange}
            {...register("projectTitle")}
          />
          <Input
            label={"Description"}
            type={"textarea"}
            placeholder={"projectDescription"}
            name={"projectDescription"}
            onChange={handleInputChange}
            {...register("projectDescription")}
          />
          <Input
            label={"Image"}
            type={"file"}
            placeholder={"projectImage"}
            name={"projectImage"}
            onChange={handleInputChange}
            {...register("projectImage")}
          />
          <Input
            label={"Videos (Link)"}
            type={"text"}
            placeholder={"projectVideo"}
            name={"projectVideo"}
            onChange={handleInputChange}
            {...register("projectVideo")}
          />
        </div>
        <div className="button_container">
          {/*<Link to={"/profile"}>*/}
          <Button type="submit" buttonStyle="formulary" buttonSize="medium">
            Create Project
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

export default UserNewProject;
