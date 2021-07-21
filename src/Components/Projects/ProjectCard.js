import React from "react";
import MemberCard from "./MemberCard";

const ProjectCard = ({ project }) => {
  const {
    project_name,
    description,
    game_engine,
    language,
    audio_software,
    creation_date,
    members,
  } = project;
  return (
    <div className="Project-Card">
      <h1>{project_name}</h1>
      <h6>{creation_date}</h6>
      <p>{description}</p>
      <div className="Project-Specs">
        <p>
          {game_engine} -- {language} -- {audio_software}
        </p>
      </div>
      <div className="Project-Members">
        {members.map((member) => {
          return <MemberCard member={member} />;
        })}
      </div>
    </div>
  );
};

export default ProjectCard;
