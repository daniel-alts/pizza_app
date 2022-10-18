require("dotenv").config()
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

userRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign(body, process.env.JWT_SECRET);

        return res.json({ token });
        
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = userRouter;
