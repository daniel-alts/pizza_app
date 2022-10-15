const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

const app = express();

// configure passport middleware
app.use(passport.initialize());

// making the app aware of the passport middlewares
require("./passport_auth_middlewares");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  orderRouter
);

// Global error handling middleware
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    error: err,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
