import axios from "axios";
import React, { useState } from "react";
import TeamMembers from "./TeamMembers";
import TempMembers from "./TempMembers";
import AddVideos from "./AddVideos";
import AddPhotos from "./AddPhotos";
import "./AddProject.css";

const AddProject = ({ token, members }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [language, setLanguage] = useState("");
  const [engine, setEngine] = useState("");
  const [audio, setAudio] = useState("");
  const [date, setDate] = useState("");
  const [art, setArt] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [tempMembers, setTempMembers] = useState([]);
  const [URLS, setURLS] = useState([]);
  const [projectPhotos, setProjectPhotos] = useState([]);

  function handleSubmit() {
    axios
      .post("/api/projects", {
        ProjectData: {
          project_name: name,
          description: desc,
          language,
          game_engine: engine,
          audio_software: audio,
          creation_date: date,
          temporary_members: tempMembers.join(),
          media_urls: URLS.join(),
        },
        members: selectedMembers,
      })
      .then(({ data }) => {
        const projectPhotoData = new FormData();
        projectPhotos.forEach((photo) => {
          projectPhotoData.append("projectMedia", photo);
        });
        axios.post(`/api/projects/photos/${data.id}`, projectPhotoData);
      })
      .then(() => {})
      .catch((err) => {});
  }

  return (
    <div className="Create-Project-Form">
      <h1>Add Project</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="GeneralInfo">
          <input
            required
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <textarea
            required
            placeholder="Project Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Game Engine"
            value={engine}
            onChange={(e) => {
              setEngine(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Audio Software"
            value={audio}
            onChange={(e) => {
              setAudio(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Creation Date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          />
          <input
            required
            type="text"
            placeholder="Art Software"
            value={art}
            onChange={(e) => {
              setArt(e.target.value);
            }}
          />
        </div>
        <TeamMembers
          members={members}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
        <div className="CustomFields">
          <TempMembers
            tempMembers={tempMembers}
            setTempMembers={setTempMembers}
          />
          <AddVideos URLS={URLS} setURLS={setURLS} />
        </div>
        {/* <AddPhotos
          setProjectPhotos={setProjectPhotos}
          projectPhotos={projectPhotos}
        /> */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddProject;
