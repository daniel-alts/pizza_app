const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const basicAuthMiddleware = require('./middlewares');
const orderRoutes = require('./routes/order');
const userRoutes = require("./routes/user");

const app = express();

app.use(basicAuthMiddleware);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use(userRoutes);
app.use(orderRoutes);


mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});


module.exports = app;