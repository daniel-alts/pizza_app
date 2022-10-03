const orderModel = require("../models/orderModel");
const moment = require("moment");
const userModel = require("../models/users");

const accessingOrder = async (req, res, next) => {
  try {
    const id = req.body.id
    
    const users = await userModel.find()
    const user = users.find(user => user.id === id)

    if (!user) {
      return res.status(404).json({
        message: "cant perform operation"
      })
    }
    next()
  } catch (error) {
    error.message = "token not passed or access denied";
    error.status = 404;
    next(error);
  }
}

const getOrders = async (req, res, next) => {
  try {
    
    const { limit = 1, page = 1, } = req.query;
    // console.log("hi")
    
    const orders = await orderModel
      .find({})
      .sort({ total_price: "asc", created_at: "asc", state:"asc" })
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * limit);

    return res.json({ status: true, orders });
  } catch (error) {
    error.message = "invalid connection";
    error.status = 404;
    next(error);
  }
};

const addOrders = async (req, res, next) => {
  try {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
      prev += curr.price * curr.quantity;
      return prev;
    }, 0);

    const order = await orderModel.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });

    return res.json({ status: true, order });
  } catch (error) {
    error.message = "invalid connection";
    error.status = 404;
    next(error);
  }
};
const getOrdersById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { state = 3 } = req.query;
    const order = await orderModel.findById(orderId);

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
  } catch (error) {
    error.message = "invalid connection";
    error.status = 404;
    next(error);
  }
};

const patchOrder = async (req, res, next) => {
  try {
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
  } catch (error) {
    error.message = "invalid connection";
    error.status = 404;
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id });

    return res.json({ status: true, order });
  } catch (error) {
    error.message = "invalid connection";
    error.status = 404;
    next(error);
  }
};

module.exports = {
  accessingOrder,
  addOrders,
  getOrders,
  getOrdersById,
  patchOrder,
  deleteOrder,
};
