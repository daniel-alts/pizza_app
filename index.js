require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");

const userController = require("./controls/userController");
const orderController = require("./controls/orderController");
const auth = require("./middleware/auth");
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", userController);
app.use(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  orderController
);

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

const PORT = process.env.PORT || 3787;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
