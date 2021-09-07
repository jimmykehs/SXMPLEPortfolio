const express = require("express");
const apiRouter = express.Router();
const membersRouter = require("./Members");
const projectsRouter = require("./Projects");
const adminRouter = require("./Admin");
const jwt = require("jsonwebtoken");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (user) {
        req.user = user;
        next();
      }
    } catch (err) {
      next(err);
    }
  } else {
    next({
      name: "HeaderErr",
      message: "Authorization must start with 'Bearer'",
    });
  }
});

apiRouter.use("/members", membersRouter);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/admin", adminRouter);

apiRouter.use((err, req, res, next) => {
  const { message } = err;
  console.log(message);
  res.send({ message });
});

module.exports = apiRouter;
