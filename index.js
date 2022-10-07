const express = require('express');
const { config } = require('dotenv');
// const mongoose = require('mongoose');
const moment = require('moment');
const { connectMongoDB } = require('./database/connection');
const orderModel = require('./model/orderModel');

// dotenv config
config();

// MongoDB connection
connectMongoDB();

const app = express();
const PORT = process.env.PORT || 3334;

app.use(express.json());

// Post
app.post('/order', async (req, res) => {
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

// Get by id
app.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

// Get all
app.get('/order', async (req, res) => {
  const orders = await orderModel.find();

  return res.json({ status: true, orders });
});

// Patch
app.patch('/order/:id', async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: 'Invalid operation' });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
});

// Delete
app.delete('/order/:id', async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

app.listen(PORT, () => {
  console.log(
    `This Pizza app is "OBI-diently" and "YUSUF-fully" listening for requests at http://127.0.0.1:${PORT}`
  );
});
