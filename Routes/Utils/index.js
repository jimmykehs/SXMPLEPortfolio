function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "Unauthorized",
      message: "You must be logged in to make changes",
    });
  } else {
    next();
  }
}

module.exports = requireUser;
