const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const orderModel = require("./orderModel");
const userModel = require("./userModel");
const bcrypt = require("bcrypt");
const auth = require("./utils/middlewares/authenticate");

const PORT = 3334;

const app = express();

app.use(express.json());
// app.use(auth);

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.post("/order", auth, async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await orderModel.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
  });

  return res.json({ status: true, order });
});

app.get("/order/:orderId", auth, async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

app.get("/orders", auth, async (req, res) => {
  console.log(req.query);
  const orders = await orderModel.find().sort({total_price : 1,created_at : 1,state:1});

  return res.json({ status: true, orders });
});

app.patch("/order/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
});

app.delete("/order/:id", auth, async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

// User handlers

app.post("/user", async (req, res) => {
  try {
    const { username, password, user_type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword,
      user_type,
    });

    res.status("201").json({ status: "success", user });
  } catch (err) {
    console.log(err);
  }
});

mongoose.connect("mongodb://localhost:27017");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
