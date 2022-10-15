const express = require("express");
const passport = require("passport");
const body_parser = require("body-parser");

const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const auth_router = require("./routes/authRoute");

require("./authorization");
require("dotenv").config;

const app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", auth_router);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  orderRouter
);

app.get("/", (req, res) => {
  res.send("welcome home");
});

module.exports = app;
