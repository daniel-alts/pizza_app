const express = require("express");
const userModel = require("./models/userModel");

// Validate Admin
const validateAdmin = async (req, res, next) => {
  const { username, password } = req.body.loginDetails;

  const user = await userModel.find({
    username: username,
  });
  if (!user.length) {
    return res.status(404).json({
      status: false,
      message: "User not found, sign up",
    });
  }
  if (password !== user[0].password) {
    return res.status(404).json({
      status: false,
      message: "Incorrect password, try forgot password",
    });
  }
  if (user[0].user_type !== "admin") {
    return res.status(401).json({
      status: false,
      message: "You are unauthorized to perform this operation",
    });
  }

  next();
};
const validateLoginDetails = async (req, res, next) => {
  const { username, password } = req.body.loginDetails;

  const user = await userModel.find({
    username: username,
  });
  if (!user.length) {
    return res.status(404).json({
      status: false,
      message: "User not found, sign up",
    });
  }
  if (password !== user[0].password) {
    return res.status(404).json({
      status: false,
      message: "Incorrect password, try forgot password",
    });
  }

  next();
};

module.exports = { validateAdmin, validateLoginDetails };
