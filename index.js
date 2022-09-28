const mongoose = require("mongoose");

// Express
const express = require("express");
const app = express();

app.use(express.json());

// Test LocalHost link
app.get("/", (req, res) => {
  return res.json({ status: true });
});

// middleware
// const authenticateUser = require('./middleware/authentication')

// Router
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");

// Route
// Domain: /api/v1/order && /api/v1/order/:id
app.use("/order", orderRouter);
app.use("/user", userRouter);

// MongoDB connect
mongoose.connect("mongodb://0.0.0.0:27017");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

const PORT = 3334;

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
