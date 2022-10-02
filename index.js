const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
const { authorize } = require("./middleware/auth");

const PORT = 3334;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

/* Protected Order Route */
app.use("/orders", authorize, orderRoutes);

/* User Route */
app.use("/user", userRoutes);

mongoose.connect("mongodb://localhost:27017");

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
