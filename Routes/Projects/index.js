const express = require("express");
const projectsRouter = express.Router();
const { getAllProjects, createProject, deleteProject } = require("../../db");

projectsRouter.get("/", async (req, res, next) => {
  try {
    const allProjects = await getAllProjects();
    res.send(allProjects);
  } catch (error) {
    next(error);
  }
});

projectsRouter.post("/", async (req, res, next) => {
  try {
    const allProjects = await createProject(
      req.body.ProjectData,
      req.body.members
    );
    res.send(allProjects);
  } catch (err) {
    next(err);
  }
});

projectsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedProject = await deleteProject(id);
    res.send(removedProject);
  } catch (error) {
    next(error);
  }
});

module.exports = projectsRouter;
