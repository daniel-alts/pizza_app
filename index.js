const express = require("express");
const mongoose = require("mongoose");
const process = require('process');
require("dotenv").config();

const basicAuthMiddleware = require('./middlewares');
const orderRoutes = require('./routes/order');
const userRoutes = require("./routes/user");

const PORT = 3334;

const app = express();

app.use(basicAuthMiddleware);
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use(userRoutes);
app.use(orderRoutes);


mongoose.connect(process.env.DB_URL);

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
