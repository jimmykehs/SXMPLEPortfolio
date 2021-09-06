const express = require("express");
const projectsRouter = express.Router();
const {
  getAllProjects,
  getProjectByID,
  createProject,
  deleteProject,
  addProjectPhotos,
} = require("../../db");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Assets/ProjectImages");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1000);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

projectsRouter.get("/", async (req, res, next) => {
  try {
    const allProjects = await getAllProjects();
    res.send(allProjects);
  } catch (error) {
    next(error);
  }
});

projectsRouter.get("/:projectID", async (req, res, next) => {
  try {
    const { projectID } = req.params;
    const project = await getProjectByID(projectID);
    res.send(project);
  } catch (error) {
    next(error);
  }
});

projectsRouter.post("/", async (req, res, next) => {
  try {
    const newProject = await createProject(
      req.body.ProjectData,
      req.body.members
    );
    res.send(newProject);
  } catch (err) {
    next(err);
  }
});

projectsRouter.post(
  "/photos/:id",
  upload.array("projectMedia"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let newPhotos = [];
      req.files.forEach(async (file) => {
        const newPath = file.path.slice(6);
        const newMedia = await addProjectPhotos(id, newPath);
        newPhotos.push(newMedia);
        if (newPhotos.length === req.files.length) {
          res.send(newPhotos);
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

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
