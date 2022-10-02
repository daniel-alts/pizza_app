const express = require("express");
const registerRoute = require("./routes/auth");
require("dotenv").config();
const mongoose = require("mongoose");
const orderRoute = require("./routes/OrderModel");

const PORT = process.env.PORT;

const MONGO_DB_COLLECTION_URL = process.env.MONGO_DB_COLLECTION_URL;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use("/api/order", orderRoute);
app.use("/api", registerRoute);

mongoose.connect(MONGO_DB_COLLECTION_URL);

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
