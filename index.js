require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const passportConfig = require("./passport");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/orders",
  passport.authenticate("jwt", { session: false }),
  orderRoutes()
);
app.use("/api/users", userRoutes());
app.use("/api/auth", authRoutes());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

mongoose.connect(MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
