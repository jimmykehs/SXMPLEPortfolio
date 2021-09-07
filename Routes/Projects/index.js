const express = require("express");
const projectsRouter = express.Router();
const {
  getAllProjects,
  getProjectByID,
  createProject,
  deleteProject,
  addProjectPhotos,
} = require("../../db");

var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
});
s3 = new aws.S3();
const projectImagesURL =
  "https://sxmpleimages.s3.us-east-2.amazonaws.com/ProjectImages/";
let fileName;

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.bucket}/ProjectImages`,
    key: function (req, file, cb) {
      console.log(file);
      fileName = Date.now() + file.originalname;
      cb(null, fileName); //use Date.now() for unique file keys
    },
  }),
});

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
        console.log(file);
        const newMedia = await addProjectPhotos(id, file.location);
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
