const express = require("express");
const usersModel = require("../model/userModel");

const userRoute = express.Router();

userRoute.post("/user", (req, res) => {
  const user = req.body;
  usersModel
    .create(user)
    .then((users) => {
      res.status(200).send({
        message: "User successfully added !",
        data: users,
      });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

module.exports = userRoute;
