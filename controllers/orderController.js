const moment = require("moment");
const orderModel = require("../models/orderModel");


exports.createOrder = async (req, res) => {
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

    res.status(201).json({ status: true, order });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


// GETS ALL ORDER
exports.getAllOrder = async (req, res) => {
  try {

    // QUERY STRING
    const query = req.query
    const {page=1, limit=10} = req.query
    const orders = await orderModel.find(query)
        .sort({total_price: 1, created_at: -1})     // SORTS RESULTS BY TOTAL PRICE <asc-des> AND CREATED_AT <asc-des>
        .limit(+limit)         // APPLIES A LIMIT TO THE VALUE OF RESULT RETURNED TO USER
        .skip((page - 1) * limit)       // APPLIES THE SKIP TO IT 

    res.status(200).json({ status: true, orders });


  } catch (err) {
    res.status(400).json({
      status: false,
      order: null,
      message: err,
    });
  }
};


// DELETES ORDER BY AN ID
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id });

    return res.status(200).json({ status: true, order });
  } catch (err) {
    res.status(400).json({
      status: false,
      order: null,
      message: err,
    });
  }
};


// GET ORDER BY A PARTICULAR ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.status(200).json({ status: true, order });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err,
    });
  }
};


// UPDATE AN ORDER
exports.updateOrder = async (req, res) => {
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
};