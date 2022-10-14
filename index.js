const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const connectToDatabase = require("./db"); // require connection to database
const ordersRouter = require("./routes/orders");
const userRouter = require("./routes/userRoute");
require("dotenv").config();
require("./auth/auth");

const PORT = process.env.PORT || 3334;

const app = express();

connectToDatabase(); //Handles coonection to database

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(
  "/order",
  passport.authenticate("jwt", { session: false }),
  ordersRouter
);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.json({ status: true, message: "Welcome to home page" });
});

// Errors Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
