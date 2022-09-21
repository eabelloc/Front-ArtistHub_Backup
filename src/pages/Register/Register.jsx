import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Buttons/Button";
import { API } from "../../services/API";
import Input from "../../components/Inputs/Input";
import "./Register.css";
//TODO: EL FORMULARIO NO SE ALINEA DEL TODO AL CENTRO, PREGUNTAR A ANTONIO

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState({
    username: "",
    password: "",
    email: "",
    avatar: "",
    userType: "",
    userIntro: "",
    company: "",
    location: "",
    website: "",
    twitter: "",
    linkedin: "",
  });

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();

  const formSubmitUser = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("avatar", data.avatar[0]);
    formData.append("userType", data.userType);
    formData.append("userIntro", data.userIntro);
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("website", data.website);
    formData.append("twitter", data.twitter);
    formData.append("linkedin", data.linkedin);

    console.log(data);
    API.post("/users/register", formData).then((res) => {
      if (res) {
        navigate("/login");
        Swal.fire("Welcome to ArtistHub! Now you can Log in!");
      }
    });
  };

  return (
    <section className="register">
      <h2 className="register_title">Please, register</h2>
      <form
        className="register_form"
        style={formStyle}
        onSubmit={handleSubmit(formSubmitUser)}
      >
        <div className="boxuno_boxdos_register">
          <div className="boxuno_register">
            <Input
              label={"Username"}
              type={"text"}
              placeholder={"Username"}
              name={"username"}
              onChange={handleInputChange}
              {...register("username")}
            />
            <Input
              label={"Password"}
              type={"password"}
              placeholder={"Example123!*$"}
              name={"password"}
              onChange={handleInputChange}
              {...register("password")}
            />
            <Input
              label={"E-mail"}
              type={"email"}
              placeholder={"example@e-mail.com"}
              name={"email"}
              onChange={handleInputChange}
              {...register("email")}
            />
            <div className="boxuno_register_avatar">
              <label htmlFor="avatar">Avatar</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                {...register("avatar")}
              />
            </div>
            <div className="select_container">
              <label className="label_select_register" htmlFor="userType">
                User Type
              </label>
              <select
                style={selectStyle}
                className="select"
                {...register("userType")}
              >
                <option value="select...">Select...</option>
                <option value="customer">Customer</option>
                <option value="musician">Musician</option>
                <option value="painter">Painter</option>
                <option value="designer">Designer</option>
              </select>
            </div>
            <Input
              label={"User Intro"}
              type={"textarea"}
              placeholder={"userIntro"}
              name={"userIntro"}
              onChange={handleInputChange}
              {...register("userIntro")}
            />
          </div>

          <div className="boxdos_register">
            <Input
              label={"Company"}
              type={"text"}
              placeholder={"company"}
              name={"company"}
              onChange={handleInputChange}
              {...register("company")}
            />
            <Input
              label={"Location"}
              type={"text"}
              placeholder={"location"}
              name={"location"}
              onChange={handleInputChange}
              {...register("location")}
            />
            <Input
              label={"Website"}
              type={"text"}
              placeholder={"website"}
              name={"website"}
              onChange={handleInputChange}
              {...register("website")}
            />
            <Input
              label={"Twitter"}
              type={"text"}
              placeholder={"twitter"}
              name={"twitter"}
              onChange={handleInputChange}
              {...register("twitter")}
            />
            <Input
              label={"LinkedIn"}
              type={"text"}
              placeholder={"linkedin"}
              name={"linkedin"}
              onChange={handleInputChange}
              {...register("linkedin")}
            />
          </div>
        </div>
        <br />
        <div className="button_container_register">
          
            <Button type="submit" buttonStyle="formulary" buttonSize="medium">
              Submit
            </Button>
          
        </div>
      </form>
    </section>
  );
};

const selectStyle = {
  outlineStyle: "none",
  borderRadius: "4px",
  border: "solid 1px var(--background)",
  borderBottomWidth: "2px",
  transition: "all 0.3s ease",
  padding: "5px",
  width: "116px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default Register;
