const express = require("express");
const passport = require("passport");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

require("dotenv").config();
require("./middleware/auth"); // Signup and login authentication middleware

const db = require("./db");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const authRoute = require("./routes/Auth");

app.use("/", authRoute.route);
app.use(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  orderRouter
);

const PORT = process.env.PORT || 3343;

db.connectToMongoDb();

// renders the home page
app.get("/", (req, res) => {
  res.send("Welcome to the book API");
});

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
