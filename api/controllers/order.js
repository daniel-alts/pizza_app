const orderModel = require("../models/orderModel");
const moment = require("moment");
const { getPagination } = require("../../utils/func");

const allOrders = async (req, res) => {
  try {
    // let { query = "" } = req.body;
    /* Ascending(1) or descending(-1) order */
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

    orderModel
      .paginate(query, { offset, limit, options })
      .then((data) => {
        res.json({
          orders: data.docs,
          totalOrders: data.totalDocs,
          totalPages: data.totalPages,
          currentPage: data.page,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: err,
        });
      });
    // res.json({ status: true, orders });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const singleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) throw "Order Id is needed";

    const order = await orderModel.findById(orderId);

    if (!order) {
      res.status(404).json({ status: false, order: null });
    }

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items) throw "Provide the required fields";

    const total_price = items.reduce((prev, curr) => {
      prev += parseFloat(curr.price);
      return prev;
    }, 0);

    const order = await orderModel.create({
      items: items,
      created_at: moment().toDate(),
      total_price,
    });

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const editOrder = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) throw "Provide the required parameters";

    let { state } = req.body;
    if (!state) throw "Provide the required fields";

    let order = await orderModel.findById(id);
    if (!order) {
      res.status(404).json({ status: false, order: null });
    }

    if (state < order.state) {
      res
        .status(422)
        .json({ status: false, order: null, message: "Invalid operation" });
    }

    order.state = state;

    await order.save();

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw "Provide the required parameters";

    const order = await orderModel.deleteOne({ _id: id });

    res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  allOrders,
  singleOrder,
  editOrder,
  deleteOrder,
  createOrder,
};
