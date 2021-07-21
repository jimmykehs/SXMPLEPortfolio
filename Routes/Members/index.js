const express = require("express");
const membersRouter = express.Router();
const { getAllMembers, createMember } = require("../../db");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Assets");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
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

membersRouter.post("/", upload.single("ProfilePic"), async (req, res, next) => {
  try {
    let newMember;
    if (req.file) {
      console.log(req.file);
      newMember = await createMember(req.body, req.file.path);
    } else {
      newMember = await createMember(req.body);
    }
    res.send(newMember);
  } catch (error) {
    console.log(error);
  }
});

module.exports = membersRouter;
