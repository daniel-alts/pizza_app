const express = require("express");

const userRoute = express.Router();

//Get Route for all users
userRoute.get("/", (req, res) => {
  res.send("User Route")
})

//Get Route for specific users by id
userRoute.get("/:id", (req, res) => {
  res.send("User Route")
})

//Post Route
userRoute.post("/", (req, res) => {
  const body = req.body;

  res.send("User Added")
})


//Put Route
userRoute.put("/:id", (req, res) => {
  const id = req.params.id
  res.send("User Updated")
})


//Delete Route
userRoute.delete("/:id", (req, res) => {
  const id = req.params.id
  res.send("User Deleted")
})

module.exports = userRoute;