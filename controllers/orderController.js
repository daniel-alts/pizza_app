const orderModel = require("../models/orderModel");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");
const moment = require("moment");

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  // Assigning the query params to variables
  const queryObj = { ...req.query };
  //Defining the fields that are not allowed to be filtered
  const excludedFields = ["sort", "page", "fields", "limit"];

  //Removing/deleting the excluded fields from the query object
  excludedFields.forEach((el) => delete queryObj[el]);
  let query = orderModel.find(queryObj);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    // console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort("-created_at"); // Default sorting: starting from the most recent order
  }

  //Pagination
  const page = req.query.page * 1 || 1; //`*1` converts the string to a number and if the query param is not provided, then the default value is 1
  const limit = req.query.limit * 1 || 20; //`*1` converts the string to a number and if the query param is not provided, then the default value is 20
  const skip = (page - 1) * limit;
  // console.log(page, limit, skip);
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numOfOrders = await orderModel.countDocuments();
    if (skip >= numOfOrders) throw new Error("This page does not exist");
  }

  const orders = await query;
  return res.status(200).json({
    status: "success",
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
    items: body.items,
    created_at: moment().toDate(),
    total_cost,
  });
  console.log("Order is created successfully", order);
  return res.status(201).json({
    status: "success",
    order: {
      order,
    },
  });
});

exports.getOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderModel.findById(id);

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

exports.updateOrderState = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    return next(new AppError(`No order found with this specified ID `, 404));
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: "fail", order: null, message: "Invalid operation" });
  }

  order.state = state;
  await order.save();
  return res.status(200).json({
    status: "success",
    order: {
      order,
    },
  });
});

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderModel.deleteOne({ _id: id });
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
