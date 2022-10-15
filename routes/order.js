const express = require("express");
const moment = require("moment");
const orderModel = require("../model/orderModel");

const orderRoute = express.Router();

// Create Order
orderRoute.post("/order", async (req, res) => {
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

// Read all Orders
orderRoute.get("/orders", async (req, res) => {
  const orders = await orderModel.find();
  return res.json({ status: true, orders });
});

// sort
orderRoute.get("/orders", async (req, res) => {
  const orders = await orderModel
    .find()
    .sort({ total_price: 1, created_at: 1 });
  return res.json({ status: true, orders });
});

// // get paginated results
// orderRoute.get("/users/paginate", paginatedResults(users), (req, res) => {
//   res.json(res.paginatedResults);
// });

// function paginatedResults(model) {
//   // middleware function
//   return (req, res, next) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);

//     // calculating the starting and ending index
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {};
//     if (endIndex < model.length) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }

//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }

//     results.results = model.slice(startIndex, endIndex);

//     res.paginatedResults = results;
//     next();
//   };
// }

// Read Orders by OrderID
orderRoute.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);
  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }
  return res.json({ status: true, order });
});

// Update Order by OrderID
orderRoute.patch("/order/:id", async (req, res) => {
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

// Delete Order by OrderID
orderRoute.delete("/order/:id", async (req, res) => {
  const { id } = req.params;
  const order = await orderModel.deleteOne({ _id: id });
  return res.json({ status: true, order });
});

module.exports = orderRoute;
