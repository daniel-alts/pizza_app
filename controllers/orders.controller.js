const moment = require('moment');
const orderModel = require('../models/orders.model');

/**
 * makeOrder() - create an order
 * @req: contains request details
 * @res: contains response details
 *
 * Return: orders details
 */
async function makeOrder(req, res) {
  const { body } = req;

  const totalPrice = body.items.reduce((prev, curr) => {
    const previous = prev + (curr.price * curr.quantity);
    return previous;
  }, 0);

  const order = await orderModel.create({
    items: body.items,
    createdAt: moment().toDate(),
    totalPrice,
  });

  return res.json({
    status: true,
    order,
  });
}

/**
 * getOrderById() - gets order with a specific id
 * @req: contains request details
 * @res: contains response details
 *
 * Return: one order details
 * If no order, return null
 */
async function getOrderById(req, res) {
  const { orderId } = req.params;

  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({
      status: false,
      order: null,
    });
  }

  return res.json({
    status: true,
    order,
  });
}

/**
 * getOrders() - gets details of all orders made
 * @req: contains request details
 * @res: contains response details
 *
 * Return: all orders details
 */
async function getOrders(req, res) {
  let orders = await orderModel.find();

  // If user wants to sort or query data
  if (req.query) {
    const {
      sortBy,
      order,
      state,
      pageNumber,
      limit,
    } = req.query;

    // Split sort parameters and add them to an object
    const sortValues = {};
    let sortOrder;

    if (sortBy) {
      const sortParams = sortBy.split(',');

      if (order === 'desc') sortOrder = -1;
      else sortOrder = 1;

      for (let i = 0; i < sortParams.length; i += 1) {
        const key = sortParams[i];
        sortValues[key] = sortOrder;
      }
    }

    // NOTE: pageNumber starts from 0
    orders = await orderModel
      .find()
      .limit(limit)
      .skip(pageNumber * limit)
      .sort(sortValues);

    if (state) {
      orders = await orderModel
        .find({ state })
        .limit(limit)
        .skip(pageNumber * limit)
        .sort(sortValues);
    }

    return res.json({
      status: true,
      orders,
    });
  }

  return res.json({
    status: true,
    orders,
  });
}

/**
 * updateOrder() - updates order details with specific id
 * @req: contains request details
 * @res: contains response details
 *
 * Return: orders details
 */
async function updateOrder(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({
      status: false,
      order: null,
    });
  }

  if (state < order.state) {
    return res.status(422).json({
      status: false,
      order: null,
      message: 'Invalid operation',
    });
  }

  order.state = state;

  await order.save();

  return res.json({
    status: true,
    order,
  });
}

/**
 * deleteOrder() - removes order from database
 * @req: contains request details
 * @res: contains response details
 *
 * Return: delete message
 */
async function deleteOrder(req, res) {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({
    status: true,
    order,
  });
}

module.exports = {
  getOrders,
  getOrderById,
  makeOrder,
  updateOrder,
  deleteOrder,
};
