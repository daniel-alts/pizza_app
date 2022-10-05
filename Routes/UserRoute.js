const express = require("express");
const UserRouter = express.Router();
const UserDB = require("../Models/UserModel");

UserRouter.post("/", async (req, res) => {
  const { Username, Password, UserType } = req.body;
  if (!(Username || Password))
    return res.status(400).send({ 
        message: "Usernames and passwords are required" });
  try {
    const newUser = await UserDB.create({
      username: Username,
      password: Password,
      userType: UserType,
    });
    res.status(201).send({ 
        Data: newUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

UserRouter.get("/", async (req, res) => {
  try {
    const Users = await UserDB.find();
    res.status(200).send(Users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});



module.exports = UserRouter;
