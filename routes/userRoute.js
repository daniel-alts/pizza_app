const express = require("express");

const userRouter = express.Router();

const userModels = require("../model/userModel");
const bcrypt = require("bcrypt");

//CREATE A USER
userRouter.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      password: hashedPassword,
      user_type: req.body.user_type,
    };
    console.log(user);
    userModels
      .create(user)
      .then((user) => {
        res.status(201).send({
          message: "user created successfully!!",
          data: user,
        });
      })
      .catch((err) => {
        //   console.log(err);
        res.status(400).send(err);
      });
  } catch (error) {}
});

//GET ALL USERS
userRouter.get("/", (req, res) => {
  //auth
  userModels
    .find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = userRouter;
