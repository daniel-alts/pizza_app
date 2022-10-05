const moment = require('moment');
const orderModel = require('../models/orderModel');
const { authenticateOrder } = require('../authenticate/authOrder');

exports.getAllOrders = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = orderModel.find(queryObj);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('total_price created_at');
    }

    if (req.query.state) {
      query = query.find({ state: req.query.state });
    } else {
      query = query.find({ state: 1 });
    }

    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 100;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const orders = await query;

    return res.json({ status: 'success', orders });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    await authenticateOrder(req, res, 'user');
    const { id } = req.params;
    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.json({ status: true, order });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    await authenticateOrder(req, res, 'user');
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    await authenticateOrder(req, res, 'admin');
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
  } catch (err) {}
};

exports.deleteOrder = async (req, res) => {
  try {
    await authenticateOrder(req, res, 'admin');
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id });

    return res.json({ status: true, order });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
