const express = require("express");

const bodyParser = require("body-parser");

// const mongoose = require("mongoose");
// const orderModel = require("./model/orderModel");
// const userModel = require("./model/userModel");
require("dotenv").config();
const db = require("./db");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");

const PORT = process.env.PORT || 3343;

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use(bodyParser.json());

db.connectToMongoDb();

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
