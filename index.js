const express = require("express");

const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/orders", orderRouter);

module.exports = app;
