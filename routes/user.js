const express = require('express');
const User = require("../userModel");

const userRoutes = express.Router()

userRoutes.post("/users/new", async (req, res) => {
    if (await User.findOne({ username: req.body.username })) {
      return res
        .status(400)
        .json({ status: true, message: "User already exists!" });
    }
    const newUser = await User.create(req.body);
    return res.json({ status: true, newUser });
});

module.exports = userRoutes;