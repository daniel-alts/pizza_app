const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const { connectToMongoDB } = require("./database/db");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");

require("dotenv").config();
require("./middlewares/authentication/auth");

const PORT = 3334;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", authRoute);
app.use("/order", passport.authenticate("jwt", { session: false }), orderRoute);

// renders the home page
app.get("/", (req, res) => {
  return res.send("Welcome to the PIZZA API");
});

// Handle errors.
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

connectToMongoDB(
  app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
  })
);
