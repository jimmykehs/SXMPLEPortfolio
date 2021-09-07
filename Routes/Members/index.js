const express = require("express");
const membersRouter = express.Router();
const {
  getAllMembers,
  createMember,
  deleteMember,
  updateMember,
  updateMemberSort,
} = require("../../db");
const requireUser = require("../Utils");

var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
});
s3 = new aws.S3();
const userImagesURL =
  "https://sxmpleimages.s3.us-east-2.amazonaws.com/UserImages/";
let fileName;

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.bucket}/UserImages`,
    key: function (req, file, cb) {
      console.log(file);
      fileName = Date.now() + file.originalname;
      cb(null, fileName); //use Date.now() for unique file keys
    },
  }),
});

membersRouter.get("/", async (req, res, next) => {
  try {
    const allMembers = await getAllMembers();
    res.send(allMembers);
  } catch (error) {
    console.log(error);
  }
});

membersRouter.post(
  "/",
  requireUser,
  upload.single("ProfilePic"),
  async (req, res, next) => {
    try {
      let newMember;
      if (req.file) {
        newMember = await createMember(req.body, userImagesURL + fileName);
      } else {
        newMember = await createMember(req.body);
      }
      res.send({ message: "Hey", newMember });
    } catch (error) {
      next(error);
    }
  }
);

membersRouter.delete("/:memberID", async (req, res, next) => {
  try {
    const { memberID } = req.params;
    const removedMember = await deleteMember(memberID);
    res.send(removedMember);
  } catch (error) {
    next(error);
  }
});

membersRouter.patch(
  "/:memberID",
  upload.single("ProfilePic"),
  async (req, res, next) => {
    try {
      const { name, position } = req.body;
      if (name === "Error") {
        throw new Error("You messed up");
      }
      let userData = {
        name,
        position,
      };
      if (req.file) {
        userData.image_path = userImagesURL + fileName;
      }
      const { memberID } = req.params;

      const updatedMember = await updateMember(memberID, userData);
      res.send(updatedMember);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = membersRouter;
