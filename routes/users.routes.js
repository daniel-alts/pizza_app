const userModel = require("../models/user.models");
const moment = require("moment");
const express = require("express");

const userRoute = express.Router();

// get users
userRoute.get("/", (req, res) => {
  userModel
    .find()
    .then((user) => res.send(user))
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

// create user
userRoute.post("/", (req, res) => {});

// update user
userRoute.put("/:id", (req, res) => {});

// delete user
userRoute.delete("/:id", (req, res) => {});
