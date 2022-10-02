const express = require("express");
const userModel = require("../models/userModel");
const registerRoute = express.Router();
const bcrypt = require("bcrypt");

registerRoute.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password,
  });
  try {
    await newUser.save().then((result) => {
      const { username, email, user_type } = result;
      returnObj = {
        username,
        email,
        user_type,
      };
    });
    return res.status(201).json(returnObj);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = registerRoute;
