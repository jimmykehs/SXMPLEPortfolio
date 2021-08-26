import React from "react";
import ProjectCard from "./ProjectCard";
import "./Project.css";

const Projects = ({ projects, setProjects, token }) => {
  return (
    <section id="Projects" className="Section">
      <h1>Projects</h1>
      {projects.map((project, index) => {
        return (
          <ProjectCard
            key={project.id}
            index={index}
            project={project}
            projects={projects}
            setProjects={setProjects}
            token={token}
          />
        );
      })}
    </section>
  );
};

export default Projects;
