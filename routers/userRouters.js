const express = require("express");
const authUserRouter = express.Router();
const USERS = require("../model/userModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

authUserRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "SignUp Successful",
      user: req.user,
    });
  }
);

authUserRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(error.message);
      }
      req.logIn(user, { session: false }, async (error) => {
        if (error) return next(error.message);
        const body = { _id: user._id, username: user.UserName };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        return res.send({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authUserRouter.get("/", async (req, res) => {
  try {
    const Users = await USERS.find();
    const allUsers = Users.map((user) => {
      return {
        UserName: user.UserName,
        UserPassword: user.Password,
      };
    });
    res.status(200).send(allUsers);
  } catch (error) {
    console.log(error.message);
    res.status(409).send(error.message);
  }
});

module.exports = authUserRouter;
