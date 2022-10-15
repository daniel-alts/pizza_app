const express = require("express");
const passport = require("passport");
const { signup, signin } = require("../controllers/authControllers");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  signup
);
router.post("/signin", signin);

module.exports = router;
