const express = require("express");
const projectsRouter = express.Router();
const { getAllProjects } = require("../../db");

projectsRouter.get("/", async (req, res, next) => {
  try {
    const allProjects = await getAllProjects();
    res.send(allProjects);
  } catch (error) {
    next(error);
  }
});

module.exports = projectsRouter;
