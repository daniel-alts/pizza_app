const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");

require("./db").connectToMongoDB(); // Connect to MongoDB
require("dotenv").config();
require("./authentication/auth");
const orderRoute = require("./routes/orderRoute");

// const { auth, admin } = require("./middlewares");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use("/", authRoute);
app.use("/", passport.authenticate("jwt", { session: false }), orderRoute);

// app.use("/api/order", [auth, admin], orderRoute);

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
