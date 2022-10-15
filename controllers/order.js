const orderModel = require("../models/orderModel");

const moment = require("moment");

//GET ALL ORDERS
const getAllOrder = async (req, res) => {
  try {
    // console.log(req.query);
    //BUILD THE STATE QUERY
    const queryByState = { ...req.query };
    // console.log(queryByState);

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => {
      delete queryByState[el];
    });

    // console.log(queryByState);

    let query = orderModel.find(queryByState);

    //SORTING BY TOTAL PRICE AND DATE CREATED FROM ASC TO DESC

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
      // query = query.sort;
    }

    //PAGINATION

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    //CHECK IF THE NUMBER OF PAGES IS MORE THAN THE NUMBER OF ENTRY
    if (req.query.page) {
      const numOrder = await orderModel.countDocuments();
      // console.log(numOrder);
      if (skip >= numOrder) {
        throw new Error("This page does not exist");
      }
    }

    //EXECUTE THE QUERY
    const order = await query;

    res.status(200).json({
      status: "success",

      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "false",
      message: err,
    });
  }
};

//GET SINGLE ORDERS
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const order = await orderModel.findById(id);

    // console.log(order)
    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }
    return res.status(200).json({ status: true, order });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: err,
    });
  }
};

//CREATE ORDERS
const createOrder = async (req, res) => {
  const body = req.body;

  //   console.log(body);

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await orderModel.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
  });

  return res.status(201).json({ status: true, order });
};

//UPDATE ORDERS
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  console.log(typeof id);
  console.log(typeof state);

  const order = await orderModel.findById({ _id: id });

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

  return res.status(200).json({ status: true, order });
};

//DELETE ORDERS
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.status(200).json({ status: true, order });
};

module.exports = {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
