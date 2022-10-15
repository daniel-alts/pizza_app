const orderModel = require("../models/orderModel");
const moment = require("moment");

exports.addOrders = async function (req, res) {
  try {
    const body = req.body;
    // console.log(body);
    const total_price = body.items.reduce((prev, currItem) => {
      prev += currItem.price * currItem.quantity;
      return prev;
    }, 0);

    const order = await orderModel.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });

    return res.status(201).json({ status: true, order });
  } catch (error) {
    res.status(404).json({ message: "failed to post orders", error });
  }
};

exports.getAllOrder = async function (req, res) {
  try {
    const queryObj = { ...req.query };
    // console.log(queryObj);

    const reservedkeys = ["sort", "page", "limit"];
    reservedkeys.forEach((key) => delete queryObj[key]);

    let orderQuery = orderModel.find(queryObj);
    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      orderQuery = orderQuery.sort(sortBy);
    } else {
      orderQuery.sort({ state: -1 });
    }
    // pagination

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    orderQuery.skip(skip).limit(limit);
    const orders = await orderQuery;

    return res
      .status(200)
      .json({ status: true, results: orders.length, orders });
  } catch (error) {
    res.status(404).json({ message: "unable to get orders", error });
  }
};

exports.getAllOrderById = async function (req, res) {
  try {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.json({ status: true, order });
  } catch (error) {
    res.status(404).json({ message: "cant get order by id", error });
  }
};
exports.updateOrders = async function (req, res) {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const { state } = req.body;
    console.log(state);

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
    res.status(401).json({ message: "cant get order by id", error });
  }
};
exports.deleteOrders = async function (req, res) {
  try {
    const { orderId } = req.params;

    const order = await orderModel.deleteOne({ _id: orderId });

    return res.status(204).json({ status: true, order });
  } catch (error) {
    res.status(401).json({ message: "order can not be deleted", error });
  }
};
