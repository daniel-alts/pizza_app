const express = require("express");
const { DBconnection } = require("./db");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRouter");

const PORT = 3334;

const app = express();
DBconnection();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use("/user", userRouter);
app.use("/order", orderRouter);

m;
