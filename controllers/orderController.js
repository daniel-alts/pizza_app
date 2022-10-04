const orderModel = require("../models/orderModel");

exports.getAllOrders = async (req, res) => {
  try {
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

    const orders = await query;
    return res.json({ status: true, orders });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.createOrder = async (req, res) => {
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
  return res.json({ status: true, order });
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
};
exports.updateOrderState = async (req, res) => {
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

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  await orderModel.deleteOne({ _id: id });
  return res.json({ status: true, order });
};
