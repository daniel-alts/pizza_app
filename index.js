const mongoose = require("mongoose");
require("dotenv").config();

// Express
const express = require("express");
const app = express();

// Middleware
require("./middleware/passportAuth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test LocalHost link
app.get("/", (req, res) => {
  return res.json({ status: true });
});

// Router
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// Route
// Domain: /api/v1/order && /api/v1/order/:id
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

// MongoDB connect
mongoose.connect("mongodb://0.0.0.0:27017/passport-jwt");

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
