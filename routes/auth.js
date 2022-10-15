const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
    userType: req.body.userType,
  });
    
  user
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
      .catch((err) => {
        console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.login(userName, password);
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

module.exports = router;
