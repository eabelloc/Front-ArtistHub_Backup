import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";
import { JwtContext } from "../../contexts/jwtContext";
import { API } from "../../services/API";
import "./ProfileForm.css";

const ProfileForm = () => {
  const { user, setUser, logout } = useContext(JwtContext);
  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState({
    username: "",
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
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();

  /*const defaultValue = {
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    userType: user.userType,
    projects: user.projects,
    favProjects: user.favProjects,
    medias: user.medias,
    userIntro: user.userIntro,
    company: user.company,
    location: user.location,
    website: user.website,
    twitter: user.twitter,
    linkedin: user.linkedin,
  };*/

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("avatar", data.avatar[0]);
    formData.append("userType", data.userType);
    formData.append("projects", data.projects);
    formData.append("favProjects", data.favProjects);
    formData.append("medias", data.medias);
    formData.append("userIntro", data.userIntro);
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("website", data.website);
    formData.append("twitter", data.twitter);
    formData.append("linkedin", data.linkedin);

    API.patch(`/users/${user._id}`, formData).then((res) => {
      if (res) {
        logout();
        navigate("/login");
      }
    });
  };

  const deleteUser = () => {
    API.delete(`/users/${user._id}`).then((res) => {
      if (res) {
        logout();
        navigate("/");
      }
    });
  };

  return (
    <section className="edit_profile">
      <div className="profile_form_container">
        <form
          className="profile_form"
          style={formStyle}
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="boxuno_boxdos_boxtres">
            <div className="card-container">
              <article>
                {" "}
                {user.avatar != undefined ? (
                  <div className="avatar_img_container">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="imagen_profile_form"
                    />
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
                {user.username}{" "}
                <span className="normal-text">{user.location}</span>
              </h1>
              <h2 className="normal-text">{user.userType}</h2>
              <div className="divcompany">
                <p>Company: {user.company}</p>
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
              <div className="divsocialinfo">
                <p>About me: {user.userIntro}</p>
              </div>
            </div>
            <div className="boxuno">
              <h2>Edit Profile</h2>
              <Input
                label={"Username"}
                type={"text"}
                placeholder={"username"}
                name={"username"}
                onChange={handleInputChange}
                {...register("username")}
              />
              <Input
                label={"E-mail"}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                onChange={handleInputChange}
                {...register("email")}
              />
              <Input
                label={"Avatar"}
                type={"file"}
                placeholder={"Avatar"}
                name={"avatar"}
                onChange={handleInputChange}
                {...register("avatar")}
              />
              <div className="select_container">
                <label className="label_select_profile" htmlFor="userType">
                  Change your type?
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
                label={"About me..."}
                type={"textarea"}
                placeholder={"About me..."}
                name={"userIntro"}
                onChange={handleInputChange}
                {...register("userIntro")}
              />
              <div className="button_container">
                <Button
                  type="submit"
                  buttonStyle="formulary"
                  buttonSize="small"
                >
                  Save Changes
                </Button>
                <Button
                  type="submit"
                  buttonStyle="formulary"
                  buttonSize="small"
                  onClick={() => deleteUser()}
                >
                  Delete Profile
                </Button>
              </div>
            </div>

            <div className="boxdos">
              <Input
                label={"Company"}
                type={"text"}
                placeholder={"Company"}
                name={"company"}
                onChange={handleInputChange}
                {...register("company")}
              />
              <Input
                label={"Location"}
                type={"text"}
                placeholder={"Location"}
                name={"location"}
                onChange={handleInputChange}
                {...register("location")}
              />
              <Input
                label={"Website"}
                type={"text"}
                placeholder={"Website"}
                name={"website"}
                onChange={handleInputChange}
                {...register("website")}
              />
              <Input
                label={"Twitter"}
                type={"text"}
                placeholder={"Twitter"}
                name={"twitter"}
                onChange={handleInputChange}
                {...register("twitter")}
              />
              <Input
                label={"LinkedIn"}
                type={"text"}
                placeholder={"LinkedIn"}
                name={"linkedin"}
                onChange={handleInputChange}
                {...register("linkedin")}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const selectStyle = {
  outlineStyle: "none",
  borderRadius: "4px",
  border: "solid 1px var(--color-font-secondary)",
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

export default ProfileForm;
