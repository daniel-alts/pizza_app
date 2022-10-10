const express = require("express");
const passport = require("passport");
const router = express.Router();

// This is used to init the router.get
router.use(passport.initialize());

const { register, login, authorize } = require("../controller/auth");

router.post("/register", register);
router.post("/login", login);

// Router to protect user information by checking if token is authentic
router.get(
  "/authorize",
  passport.authenticate("jwt", { session: false }),
  authorize
);

module.exports = router;
