const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = express.Router();

//create signup route
authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup Succesful",
      user: req.user,
    });
  }
);

//create login route
authRouter.post(
  "/login",
  async (req, res, next)=>{
    passport.authenticate("login", async (err, user, info) => {
        try {
          if (err) {
            return next(err);
          }
    
          if (!user) {
            const error = new Error("Username or password Incorrect");
            return next(error);
          }
    
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
            //create the body object(payload) to hold the userID, email and whatever, do not include password
            const body = { _id: user._id, email: user.email };
            //create the token using the body object and the JWT_SECRET(from out .env)
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
            return res.json({ token });
          });
        } catch (error) {
          return next(error);
        }
      })(req, res, next);

  }

);

module.exports = authRouter;
