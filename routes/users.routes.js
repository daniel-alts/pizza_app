const userModel = require("../models/user.models");
const express = require("express");
const basicOauth = require("../middleware/authenticate.middleware");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

// get users
userRoute.get("/", basicOauth, (req, res) => {
    const authenticatedUser = req.user;

  if (!authenticatedUser) {
    return res.status(403).send("Forbidden");
  }

  if (authenticatedUser.role !== "admin") {
    return res.status(401).send("You're not authorized");
  }
  userModel
    .find()
    .then((user) => res.send(user))
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

// create user
userRoute.post("/", async (req, res) => {
  const user = await req.body;
  const encryptPassword = await bcrypt.hash(user.password, 10);
  user.password = await encryptPassword;
  userModel
    .create(user)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// update user
userRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const userUpdate = req.body;
  userUpdate.updated_at = new Date();
  userModel
    .findByIdAndUpdate(id, userUpdate, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// delete user
userRoute.delete("/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndRemove(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = userRoute;
