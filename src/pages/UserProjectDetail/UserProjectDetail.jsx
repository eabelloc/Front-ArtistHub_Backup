import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../../services/API";
import "./UserProjectDetail.css";
import { useForm } from "react-hook-form";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { JwtContext } from "../../contexts/jwtContext";
import { useContext } from "react";

//TODO: PREGUNTAR SOBRE EL DAFAULTVALUES, QUE NO NOS ESTA FUNCIONANDO :/

const UserProjectDetail = () => {
  const { user } = useContext(JwtContext);
  const project = user.projects;
  console.log(project);
  const { id } = useParams();
  console.log(id);
  const [projecto, setProjecto] = useState("");
  const getProjectoById = async () => {
    API.get(`/projects/${id}`).then((res) => {
      setProjecto(res.data.project);
      console.log(res.data.project);
    });
  };

  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState({
    projectTitle: "",
    projectDescription: "",
    projectImage: "",
    projectVideo: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  function removeItemFromArr(project, id) {
    let i = project.indexOf(id);

    if (i !== -1) {
      project.splice(i, 1);
    }
  }
  /* function removeItemFromArr ( project, id ) {
    let i = project.indexOf( id );
 
    if ( i !== -1 ) {
        project.splice( i, 1 );
    }
}
 
removeItemFromArr( foo, 'picture-1' );
console.info( foo );
// ["thumb-1", "thumb-2", "thumb-3", "thumb-4"]
 
removeItemFromArr( foo, 'thumb-2' );
console.info( foo );
// ["thumb-1", "thumb-3", "thumb-4"]*/

  let navigate = useNavigate();

  const defaultValue = {
    projectTitle: projecto.projectTitle,
    projectDescription: projecto.projectDescription,
    projectVideo: projecto.projectVideo,
  };

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("projectTitle", data.projectTitle);
    formData.append("projectDescription", data.projectDescription);
    formData.append("projectImage", data.projectImage[0]);
    formData.append("projectVideo", data.projectVideo);

    API.patch(`/projects/${projecto._id}`, formData).then((res) => {
      if (res) {
        navigate("/profile");
      }
    });
  };

  const deleteProject = () => {
    API.delete(`/projects/${projecto._id}`).then((res) => {
      removeItemFromArr(project, id);
      const editUser = { projects: project };
      API.patch(`/users/${user._id}`, editUser).then((resUser) => {
        console.log("resUser: ", resUser);
      });
      if (res) {
        navigate("/profile");
      }
    });
  };

  useEffect(() => {
    getProjectoById();
  }, []);

  return (
    <section className="edit_project">
      <div className="project_detail_wrapper">
        <div className="project_infodetail_containerdos">
          <div className="project_title_container">
            <h2>{projecto.projectTitle}</h2>
          </div>
          <div className="project_content_containerdos">
            <h4 className="project_description">
              Description: {projecto.projectDescription}
            </h4>
          </div>
          <div className="project_info_container">
            <div className="project_img_container">
              <img src={projecto.projectImage} alt={projecto.projectTitle} />
            </div>
          </div>
          <div className="project_content_container">
            <h4>Videos: </h4>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${projecto.projectVideo}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="project_form_container">
          <form
            className="profile_form"
            style={formStyle}
            onSubmit={handleSubmit(formSubmit)}
          >
            <h2>Edit Project</h2>
            <div className="boxuno_boxdos">
              <div className="boxuno">
                <Input
                  label={"Title"}
                  type={"text"}
                  placeholder={"projectTitle"}
                  name={"projectTitle"}
                  onChange={handleInputChange}
                  {...register("projectTitle")}
                  defaultValue={defaultValue.projectTitle}
                />
                <Input
                  label={"Description"}
                  type={"textarea"}
                  placeholder={"projectDescription"}
                  name={"projectDescription"}
                  onChange={handleInputChange}
                  {...register("projectDescription")}
                  defaultValue={defaultValue.projectDescription}
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
                  label={"Video"}
                  type={"text"}
                  placeholder={"projectVideo"}
                  name={"projectVideo"}
                  onChange={handleInputChange}
                  {...register("projectVideo")}
                  defaultValue={defaultValue.projectImage}
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
              onClick={() => deleteProject()}
            >
              Delete Project
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProjectDetail;

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
