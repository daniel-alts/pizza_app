const express = require("express");
const userModel = require("../models/userModel");
const registerRoute = express.Router();
const CryptoJS = require("crypto-js");

registerRoute.post("/register", async (req, res) => {
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
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
