const express = require("express");
const UserModel = require("../userModel")

const userRoute = express.Router();

//Get Route for all users
userRoute.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.status(200).send(users)
    }).catch((err) => {
      console.log(err);
      res.status(500).send(err.message)
    })
})

//Get Route for specific users by id
userRoute.get("/:id", (req, res) => {
  const id = req.params.id;

  UserModel.findById(id)
    .then((user) => {
      res.status(200).send(user)
    }).catch((err) => {
      console.log(err);
      res.status(400).send(err.message)
    })
})

//Post Route
userRoute.post("/", (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  UserModel.create(newUser)
    .then((user) => {
      res.status(201).send("user successfully added to the database")
    }).catch((err) => {
      res.status(400).send(err.message)
    })
})


//Put Route
userRoute.put("/:id", (req, res) => {
  const id = req.params.id
  const { id:id2 } = req.params;
  console.log(id2);
  const id3 = req.params;
  console.log(id3);

  const fruits = {
    banana: "1",
    mango: "2",
    orange: "3",
    paw_paw: "4",
    grape: "5",
    sour_sop: "6"
  }

  const {grape, paw_paw} = fruits;
  console.log(grape, paw_paw);

  const userUpdate = req.body;

  UserModel.findByIdAndUpdate(id, userUpdate, {new: true})
    .then((user) => {
      res.status(201).send("user's details successfully updated")
    }).catch((err) => {
      res.status(400).send(err.message)
    })
})


//Delete Route
userRoute.delete("/:id", (req, res) => {
  const id = req.params.id

  UserModel.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("User deleted from the database")
    }).catch((err) => {
      res.status(400).send(err.message)
    })
})

module.exports = userRoute;