const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const { connectToMongoDB } = require("./db/db");

const { orderRouter } = require("./router/orderRoute");
const { userRouter } = require("./router/userRoute");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/order", orderRouter);
app.use("/users", userRouter);

connectToMongoDB();

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});


module.exports = app