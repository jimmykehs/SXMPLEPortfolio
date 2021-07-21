const express = require("express");
const projectsRouter = express.Router();
const { getAllProjects, createProject } = require("../../db");

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
    console.log(req.body);
    const allProjects = await createProject(
      req.body.ProjectData,
      req.body.members
    );
    res.send(allProjects);
  } catch (err) {
    next(err);
  }
});

module.exports = projectsRouter;
