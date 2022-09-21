import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { JwtContext } from "../../contexts/jwtContext";

const Projects = () => {
  const { user } = useContext(JwtContext);
  const { username } = useParams();

  const [allProjects, setAllProjects] = useState([]);

  const getProjectsByUsername = async () => {
    API.get(`/users/projects/${username}`).then((res) => {
      setAllProjects(res.data.data.projects);
    });
  };

  useEffect(() => {
    getProjectsByUsername();
  }, []);

  return <section></section>;
};

export default Projects;
