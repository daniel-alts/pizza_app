const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const orderModel = require("./models/orderModel");

const PORT = 3334;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use("/order", require("./routes/orderRouter"));
app.use("/account", require("./routes/userRouter"));

mongoose.connect("mongodb://localhost:27017");

// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB Successfully");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("An error occurred while connecting to MongoDB");
//   console.log(err);
// });

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
