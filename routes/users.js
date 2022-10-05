const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

//  Get all users
userRouter.get("/", async (req, res) => {
  try {
    await userModel
      .find({})
      .then((users) => {
        return res.status(200).json({
          status: true,
          users,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json(err);
      });
  } catch (err) {
    console.log(err);
  }
});

//  Get user by ID
userRouter.get("/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await userModel.findById(userID);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, user: null, message: "User not found" });
    }

    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
  }
});

//  Create a new user
userRouter.post("/", async (req, res) => {
  const user = req.body;
  const password = user.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    userModel
      .create(user)
      .then((user) => {
        return res.status(201).send({
          status: true,
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err);
  }
});

// Update a user detail
userRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const { password } = user;

  // hash password in case of a password change
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  try {
    userModel
      .findByIdAndUpdate(id, user, { new: true })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  } catch (err) {
    console.log(err);
  }
});

// Delete a user
userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.deleteOne({ _id: id });

    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRouter;
