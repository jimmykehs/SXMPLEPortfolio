const express = require("express");
const adminRouter = express.Router();
const { getAdminByUsername } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { rebuildDB } = require("../../db/seed.js");

adminRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await getAdminByUsername(username);
    if (existingAdmin) {
      if (await bcrypt.compare(password, existingAdmin.password)) {
        delete existingAdmin.password;
        const token = jwt.sign(existingAdmin, process.env.JWT_SECRET);
        res.send({ user: existingAdmin, token });
      } else {
        next({ name: "LoginErr", message: "Invalid Credentials" });
      }
    } else {
      next({ name: "LoginErr", message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/resetDatabase", async (req, res, next) => {
  try {
    await rebuildDB();
    res.send("All is well");
  } catch (error) {
    next(error);
  }
});

module.exports = adminRouter;
