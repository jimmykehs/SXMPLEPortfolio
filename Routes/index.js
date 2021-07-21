const express = require("express");
const apiRouter = express.Router();
const membersRouter = require("./Members");
const projectsRouter = require("./Projects");

apiRouter.use("/members", membersRouter);
apiRouter.use("/projects", projectsRouter);

module.exports = apiRouter;
