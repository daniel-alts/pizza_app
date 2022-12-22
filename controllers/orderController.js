const authController = require("./authController");
const db = require("../models/sequelizeConnect");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");
const moment = require("moment");

// get models
const orderModel = db.orders;
const userModel = db.users;

exports.getAllMyOrders = catchAsyncError(async (req, res, next) => {
  // Pagination
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 50;
  let offset = (page - 1) * limit;

  if (req.query.page) {
    const numOfOrders = await orderModel.count();
    if (offset >= numOfOrders) {
      return next(new AppError("This page does not exist", 404));
    }
  }
  // Get all orders
  const orders = await orderModel.findAll({
    where: { user_id: req.user.id },
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: offset,
  });

  return res.status(200).json({
    status: "success",
    current_page: page,
    results: orders.length,
    order: {
      orders,
    },
  });
});

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  console.log(user.role);
  // Pagination
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 50;
  let offset = (page - 1) * limit;

  if (req.query.page) {
    const numOfOrders = await orderModel.count();
    if (offset >= numOfOrders) {
      return next(new AppError("This page does not exist", 404));
    }
  }

  // Get all orders
  const orders = await orderModel.findAll({
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: offset,
    include: [
      {
        model: userModel,
        attributes: ["username", "email"],
      },
    ],
  });

  return res.status(200).json({
    status: "success",
    current_page: page,
    results: orders.length,
    order: {
      orders,
    },
  });
});

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const body = req.body;

  // Getting the total cost per item and then summing it up to get the total cost of the order
  const total_cost = body.items.reduce((total, item) => {
    item.cost = item.price * item.quantity;
    // console.log(item.cost);
    return (total += item.cost);
  }, 0);

  const order = await orderModel.create({
    total_cost,
    items: body.items,
    user_id: req.user.id,
  });
  console.log("Order is created successfully", order);
  return res.status(201).json({
    status: "success",
    order,
  });
});

// Get an order by the user who created the order using the order ID
exports.getMyOrder = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  // find the order with the specified order ID and user ID
  const order = await orderModel.findOne({
    where: {
      id: orderId,
      user_id: userId,
    },
  });
  // Return error if no order is not found
  if (!order) {
    return next(new AppError(`No order found with this specified ID `, 404));
  }

  // Return error if the user_id of the order does not match the user_id of the user who is trying to access the order
  if (userId !== order.user_id) {
    return next(
      new AppError(`You are not authorized to access this order `, 401)
    );
  }

  return res.status(200).json({
    status: "success",
    order: {
      order,
    },
  });
});

// Get an order by the admin using the order ID
exports.getOrder = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await orderModel.findOne({
    where: {
      id: orderId,
    },
    include: [
      {
        model: userModel,
        attributes: ["username", "email"],
      },
    ],
  });

  if (!order) {
    return next(new AppError(`No order found with this specified ID `, 404));
  }

  return res.status(200).json({
    status: "success",
    order: {
      order,
    },
  });
});

// Update order state (0: pending, 1: confirmed, 2: delivered)
exports.updateOrderState = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id;
  const state = req.body.state;

  const order = await orderModel.findOne({
    where: {
      id: orderId,
    },
    include: [
      {
        model: userModel,
        attributes: ["username", "email"],
      },
    ],
  });

  if (!order) {
    return next(new AppError(`No order found with this specified ID `, 404));
  }
  console.log(order.id);

  const updatedState = orderModel.update(
    { state: state },
    { where: { id: order.id } }
  );

  return res.status(200).json({
    status: "success",
    order: {
      order,
    },
  });
});

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await orderModel.findOne({
    id: orderId,
  });
  if (!order) {
    return next(new AppError(`No order found with this specified ID`, 404));
  }

  const deleteOrder = await orderModel.destroy({
    where: {
      id: orderId,
    },
  });

  return res.status(200).json({
    status: "success",
    message: "Order row successfully deleted",
    order: {
      order,
    },
  });
});
