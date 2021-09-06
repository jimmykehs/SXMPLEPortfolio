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

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Assets/UserImages");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1000);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
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
        const newPath = req.file.path.slice(7);
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
    next(error);
  }
});

membersRouter.patch(
  "/:memberID",
  upload.single("ProfilePic"),
  async (req, res, next) => {
    try {
      const { name, position } = req.body;

      let userData = {
        name,
        position,
      };
      if (req.file) {
        const newPath = req.file.path.slice(7);
        userData.image_path = newPath;
      }
      const { memberID } = req.params;

      const updatedMember = await updateMember(memberID, userData);
      res.send(updatedMember);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = membersRouter;
