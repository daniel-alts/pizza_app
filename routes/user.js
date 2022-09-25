const express = require("express");
const userSchema = require("../models/userModel");

const userRoute = express.Router();

// Create user
userRoute.post("/", (req, res) => {
  const user = req.body;

  userSchema.create(user).then((user) => {
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  }).catch((err) => {
    return res.status(500).json(err.message);
  });
});

module.exports = { userRoute };
