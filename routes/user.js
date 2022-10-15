const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const userRouter = express.Router();


const SECRET = process.env.SECRET


//Sign up or Add user
userRouter.post("/signup", async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    //creating a new user
    const user = await User.create(req.body);

    //send new user as a response
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Login or authenticate user
userRouter.get("/login", async (req, res) => {
  try {
    //check if the user exist
    const user = await User.findOne({
      username: req.body.username,
    });

    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        //sign token and send it in response
        const token = await jwt.sign({ username: user.username },SECRET, {expiresIn: "2d"});
        res.status(200).json({ user, token: token });
      } else {
        res
          .status(400)
          .json({ error: "Password doesn't match, Kindly check again" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
  
});

module.exports = userRouter;
