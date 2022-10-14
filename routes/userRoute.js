const express = require("express");
const User = require("../models/userModel");

const userRoute = express.Router();

userRoute.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

userRoute.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get user by id
userRoute.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // destructured the user object. this allows me to get all other informations about a user except the password
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all users
userRoute.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = userRoute;
