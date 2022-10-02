require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const usersRouter = require("../api/routes/user");

const app = express();

const PORT = 3335;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test");

mongoose.connection.on("connected", () => {
  // console.log("Connected to Test MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  // console.log("An error occurred while connecting to MongoDB");
  // console.log(err);
});

app.use("/user", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
