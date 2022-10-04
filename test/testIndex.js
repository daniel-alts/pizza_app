const express = require("express");
const orderRouter = require("../routes/orderRoutes");
const userRouter = require("../routes/userRoutes");

const app = express();

//middleware
app.use(express.json());
app.use("/orders", orderRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome!!!");
});

module.exports = app;
