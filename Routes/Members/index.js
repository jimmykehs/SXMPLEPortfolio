const express = require("express");
const membersRouter = express.Router();
const { getAllMembers, createMember, deleteMember } = require("../../db");
const requireUser = require("../Utils");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Assets/UserImages");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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
        const newPath = req.file.path.slice(6);
        newMember = await createMember(req.body, newPath);
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
    console.log(error);
  }
});
module.exports = membersRouter;
