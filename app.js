const express = require("express");
const logger = require("morgan");
const orderRoute = require("./routes/orderRoutes");
const userRoute = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const authController = require("./controllers/authController");
require("dotenv").config();

const app = express();

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/orders", authController.protectRoute, orderRoute);
app.use("/api/v1/users", userRoute);

// Default route - Homepage
app.get("/api/v1/", (req, res) => {
  return res.json({
    status: true,
    message: "Welcome to my Pizza Homepage",
  });
});

// Catching all undefined route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
