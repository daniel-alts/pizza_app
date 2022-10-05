const express = require("express");
const logger = require("morgan");
const { connectToMongoDB } = require("./db_connect");
const orderRoute = require("./routes/orderRoutes");
const userRoute = require("./routes/userRoutes");
const userController = require("./controllers/userController");

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use("/orders", userController.authenticateUser, orderRoute);
app.use("/users", userRoute);
connectToMongoDB();

app.get("/", (req, res) => {
  return res.json({ status: true });
});

module.exports = app;
