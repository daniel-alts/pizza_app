const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const { connectToMongoDB } = require("./db/db");

const passport = require("passport");
const bodyParser = require("body-parser");

const { orderRouter } = require("./router/orderRoute");
const { userRouter } = require("./router/userRoute");

const PORT = process.env.PORT;

// const authRoute = require("./router/authRoute");

require("./authentication/auth"); // Signup and login authentication middleware

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRouter);

app.use(
  "/order",
  passport.authenticate("jwt", { session: false }),
  orderRouter
);

// app.use("/users", userRouter);

connectToMongoDB();

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
