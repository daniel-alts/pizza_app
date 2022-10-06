const Order = require("../models/orderModel");
const moment = require("moment");
const { Pagination } = require("../utils/appFeature");
const order = {};

//create a new order
order.createOrder = async (req, res) => {
  const body = req.body;
  try {
    if (!body) {
      throw new Error("Invalid request body");
    }

    const total_price = body.items.reduce((prev, curr) => {
      prev += curr.price;
      return prev;
    }, 0);

    const order = await Order.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });

    return res.status(201).json({ status: true, order });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Fail", message: error });
  }
};

//get order by order id
order.getOrder = async (req, res) => {
  try {
    const orderId = req.params;
    const order = await Order.findById(orderId.id);

    if (!order) {
      return res.status(404).json({ status: "failed", data: null });
    }
    return res.status(200).json({ status: "success", order });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Fail", message: error });
  }
};

//get all orders
order.allOrder = async (req, res) => {
  try {
    let { order = "desc", page = 1, perPage = 2, state = "" } = req.query;

    let orderType = order == "desc" ? -1 : 1;

    const { limit, offset } = getPagination(page, perPage);

    let options = {
      sort: { total_price: orderType, created_at: orderType },
    };

    let query = {
      $expr: {
        $regexMatch: {
          input: { $toString: `state` },
          regex: new RegExp(state),
        },
      },
    };

    
   const orders =   Order.paginate(query, { offset, limit, options })
    return res.json({ status: true, orders });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Fail", message: error });
  }
};

//update order by id
order.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ status: 'fail', order: 'Not Found' });
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

//delete order by id
order.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.deleteOne({ _id: id });

    return res.status(200).json({ status: true, order });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Fail", message: error });
  }
};

module.exports = order;
