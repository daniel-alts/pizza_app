const express = require("express");
const orderRouters = require("./routers/orderRoute");
const authUserRouter = require("./routers/userRouters");
const ordersRouters = require("./routers/ordersRoute");
const dbConfig = require("./config/database");
const errorHandler = require("./middleware/errorMiddleware");
const passport = require("passport");
require("./authenticate/authenticateUser");
require("dotenv").config();

const PORT = 3334;

const app = express();
dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/auth", authUserRouter);

app.use(
  "/order",
  passport.authenticate("jwt", { session: false }),
  orderRouters
);

app.use("/orders", ordersRouters);

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
