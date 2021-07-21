import React from "react";
import ProjectCard from "./ProjectCard";
import "./Project.css";

const Projects = ({ projects }) => {
  return (
    <section id="Projects" className="Section">
      <h1>Projects</h1>
      {projects.map((project) => {
        return <ProjectCard project={project} key={project.id} />;
      })}
    </section>
  );
};

export default Projects;
