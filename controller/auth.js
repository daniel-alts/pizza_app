const { hashSync, compareSync } = require("bcrypt");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
    });
    await user.save();
    res.status(201).json({
      msg: "User created successfully",
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ msg: "could not find user" });
    }
    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).json({ msg: "Incorrect password" });
    }
    const payload = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    return res.status(200).json({
      msg: "Logged in sucessfully",
      user: { username: user.username, token: "Bearer " + token },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// This authorize controller is used to show results of when the rightly authorized user logs in
const authorize = async (req, res) => {
      return res.status(200).json({
        user: {
          id: req.user._id,
          username: req.user.username,
        },
      });
    
};

module.exports = {
  register,
  login,
  authorize
};
