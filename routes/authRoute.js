const express = require("express");
const passport = require("passport");
const userController = require("../controllers/usercontroller");
const auth_router = express.Router();
// SIGNUP ROUTE
auth_router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  userController.signup
);

// LOGIN ROUTE
auth_router.post("/login", userController.login);
module.exports = auth_router;
