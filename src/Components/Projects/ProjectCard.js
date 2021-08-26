import axios from "axios";
import React from "react";
import { Media } from "react-bootstrap";
import MemberCard from "./MemberCard";

const ProjectCard = ({ index, project, projects, setProjects, token }) => {
  const {
    id,
    project_name,
    description,
    game_engine,
    language,
    audio_software,
    creation_date,
    temporary_members,
    members,
    media,
  } = project;

  async function removeProject(id) {
    try {
      const removedProject = await axios.delete(`/api/projects/${id}`);
      const newProjects = [...projects];
      newProjects.splice(index, 1);
      setProjects(newProjects);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="Project-Card">
      <div className="Project-Media">
        {media.map((url, idx) => {
          if (url.includes("youtube")) {
            return (
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/b3_lVSrPB6w"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            );
          }
          return <img src={url} key={idx} />;
        })}
      </div>
      <div className="Project-Details">
        {token && (
          <button
            className="RemoveBtn"
            onClick={() => {
              removeProject(id);
            }}
          >
            X
          </button>
        )}{" "}
        <h2>{project_name}</h2>
        <h6>{creation_date}</h6>
        <p>{description}</p>
        <div className="Project-Specs">
          <p>
            {game_engine} -- {language} -- {audio_software}
          </p>
        </div>
        <div className="Project-Members">
          {members.map((member) => {
            return <MemberCard member={member} key={member.id} />;
          })}
          {temporary_members &&
            temporary_members.split(",").map((member, idx) => {
              return <MemberCard member={member} key={idx} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
