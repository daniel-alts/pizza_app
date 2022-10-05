const express = require("express");

const userModel = require("../models/userModel");
const { authenticateUser, authorizeAdmin } = require("../authentication");

const userRouter = express.Router();

// TODO: C R U D operations on /users route

// CREATE

// ADD A NEW USER

userRouter.post("/", async (req, res) => {
  try {
    const userToBeCreated = req.body;
    const user = await userModel.create(userToBeCreated);
    return res.status(201).json({
      status: "success",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error,
    });
  }
});

userRouter.use(authenticateUser);

// UPDATE
userRouter.patch("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const update = req.body;
    const user = await userModel.findByIdAndUpdate(userId, update, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error,
    });
  }
});

// DELETE
userRouter.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findByIdAndDelete(userId);
    return res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error,
    });
  }
});

userRouter.use(authorizeAdmin);

// READ

// GETS ALL USERS
userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      status: "success",
      users: users,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error,
    });
  }
});

// GET USER BY ID

userRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    return res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error,
    });
  }
});

module.exports = userRouter;
