const express = require("express");
const orderRouters = require("./routers/orderRoute");
const userRouter = require("./routers/userRouters");
const authtenticateUser = require("./middleware/auth");
const ordersRouters = require("./routers/ordersRoute");
const dbConfig = require("./config/database");

const PORT = 3334;

const app = express();
dbConfig();

app.use(express.json());

app.use("/user", userRouter);

app.use("/order", authtenticateUser, orderRouters);

app.use("/orders", ordersRouters);

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
