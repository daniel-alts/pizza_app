const moment = require("moment");
const orderModel = require("../models/orderModel");

async function createOrder(req, res) {
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

  return res.status(200).json({ status: true, order });
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
}

async function getAllOrders(req, res) {
  const { sortBy, state, page = 1, limit = 10 } = req.query;
  let query = {};
  if (state) {
    query.state = state;
  }
  let orders =  orderModel.find(query);
  if (sortBy) {
    orders = orders.sort({ [sortBy]: "asc" });
  }

  let skip = (parseInt(page) - 1) * parseInt(limit);

  orders = await orders.skip(skip).limit(limit);
  return res.json({ status: true, orders });

}

async function updateOrder(req, res) {
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
}

async function deleteOrder(req, res) {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
}

module.exports = {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
};
