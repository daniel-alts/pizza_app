const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const userModel = require("../models/userModel");
// const { validateAdmin } = require("../authenticate");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup for JWT
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

// Login for JWT
userRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        const error = new Error("An error occurred.");
        return next(err);
      }
      if (!user) {
        const error = new Error("User not found");
        return next(err);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
        };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        return res.json({ token });
      });
    } catch (error) {
      return next(err);
    }
  })(req, res, next);
});

// ----********------Routes before the implementation of the JWT-----******-----

// Create a new user

userRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const user = await userModel.create(body);
  return res.status(201).json({ status: true, user });
});

// Get all users
userRouter.get("/", async (req, res) => {
  const user = await userModel.find();
  return res.status(200).json({ status: true, user });
});

// Get a user by Id
userRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  const user = await userModel.findById(id);

  if (!user) {
    return res.status(404).json({ status: false, message: "User not found" });
  }
  return res.status(200).json({ status: true, user });
});

// Update a user by Id
userRouter.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const user = await userModel.findByIdAndUpdate(id, body);
  return res.status(200).json({ status: true, user });
});

// Delete a user by Id
userRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  const user = await userModel.deleteOne({ _id: id });

  return res.status(200).json({ status: true, user });
});
module.exports = userRouter;
