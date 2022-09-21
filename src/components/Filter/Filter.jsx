import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { API } from '../services/API';

const Filter = () => {
const [allInfo, setAllInfo] = usteState([]);
const [filterWord, setFilterWord] = useState("");

const filteredInfo = allInfo.filter (
(users, projects, medias, socialMedia) =>

users.username.toLowerCase().includes(filterWord) ||
users.projects.toLowerCase().includes(filterWord) ||
users.medias.toLowerCase().includes(filterWord) ||

projects.projectTitle.toLowerCase().includes(filterWord) ||
projects.users.toLowerCase().includes(filterWord) ||

medias.mediaTitle.toLowerCase().includes(filterWord) ||
medias.users.toLowerCase().includes(filterWord) ||

socialMedia.company.toLowerCase().includes(filterWord) ||
socialMedia.location.toLowerCase().includes(filterWord) 


);

//TODO: preguntar si se mete en contexto o algo

}