import React from "react";
import { Media } from "react-bootstrap";
import MemberCard from "./MemberCard";

const ProjectCard = ({ project }) => {
  console.log(project);
  const {
    project_name,
    description,
    game_engine,
    language,
    audio_software,
    creation_date,
    members,
    media,
  } = project;
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
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
