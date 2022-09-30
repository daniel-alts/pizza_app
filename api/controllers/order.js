const orderModel = require("../models/orderModel");
const moment = require("moment");

const allOrders = async (req, res) => {
  try {
    /* Ascending(1) or descending(-1) order */
    let { order = "desc", page = "1" } = req.query;

    console.log(order);

    let orderType = order == "desc" ? -1 : 1;
    const orders = await orderModel.find().sort({ total_price: orderType });
    res.json({ status: true, orders });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const singleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) throw "Order Id is needed";

    const order = await orderModel.findById(orderId);

    if (!order) {
      res.status(404).json({ status: false, order: null });
    }

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items) throw "Provide the required fields";

    const total_price = items.reduce((prev, curr) => {
      prev += parseFloat(curr.price);
      return prev;
    }, 0);

    const order = await orderModel.create({
      items: items,
      created_at: moment().toDate(),
      total_price,
    });

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const editOrder = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) throw "Provide the required parameters";

    let { state } = req.body;
    if (!state) throw "Provide the required fields";

    let order = await orderModel.findById(id);
    if (!order) {
      res.status(404).json({ status: false, order: null });
    }

    if (state < order.state) {
      res
        .status(422)
        .json({ status: false, order: null, message: "Invalid operation" });
    }

    order.state = state;

    await order.save();

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw "Provide the required parameters";

    const order = await orderModel.deleteOne({ _id: id });

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  allOrders,
  singleOrder,
  editOrder,
  deleteOrder,
  createOrder,
};
