const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const { validateAdmin } = require("../authenticate");

// Create a new user
userRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const user = await userModel.create(body);
  return res.status(201).json({ status: true, user });
});

// Get all users
userRouter.get("/", validateAdmin, async (req, res) => {
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
