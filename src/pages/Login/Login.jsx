import { useContext, useState, useEffect } from "react";
import { JwtContext } from "../../contexts/jwtContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/API";
import Swal from "sweetalert2";
import "./Login.css";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();
  const { setJwt, setUser } = useContext(JwtContext);
  const formSubmit = (formData) => {
    API.post("/users/login", formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.userInDb));
        setJwt(res.data.token);
        setUser(res.data.userInDb);

        if (res.data.token) {
          navigate("/");
          Swal.fire("Wellcome to the Web!");
        }
      })
      .catch((res) => {
        if (res.response.data === "User not found") {
          Swal.fire("User not found!😔");
        } else {
          Swal.fire("Incorrect Password! ❌");
        }
        return res;
      });
  };
  return (
    <section className="login">
      <h2>Please log in:</h2>
      <form className="login_form" onSubmit={handleSubmit(formSubmit)}>
        <div className="boxuno_login">
          <Input
            label={"Username"}
            type={"text"}
            placeholder={"Username"}
            name={"username"}
            onChange={handleInputChange}
            {...register("username")}
          />
        </div>
        <div className="boxuno_login">
          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Example123!*$"}
            name={"password"}
            onChange={handleInputChange}
            {...register("password")}
          />
        </div>
        <div className="button_container">
          <Button buttonSize="medium" buttonStyle="formulary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Login;
