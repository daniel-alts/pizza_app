const express = require("express");


const userRoute = express.Router;


userRoute.get("/", (req, res) => {
  res.send("User Route")
})

module.exports = userRoute;