const express = require("express");
const userController = require("../controllers/userController");
const passport = require('passport')

const userRouter = express.Router();


// USER ROUTER WITH SIGNUP AND LOGIN ROUTES
userRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  userController.signup
);

userRouter.route("/login").post(userController.login);


    
module.exports=userRouter
