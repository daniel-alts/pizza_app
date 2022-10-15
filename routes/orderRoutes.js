const express = require("express");
const moment = require("moment");

const orderModel = require("../models/orderModel");

const pizzaRoute = express.Router();


//Make an order
pizzaRoute.post("/order", (req, res) => {
  const total_price = order.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const newOrder = orderModel.create({
    items: order.items,
    created_at: moment().toDate(),
    total_price,
  });

  return res.json({ status: true, newOrder });
});

//Get an order by ID
pizzaRoute.get("/order/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

//Get all the orders
pizzaRoute.get("/orders", async (req, res, next) => {
  const { date_created, total_price, state, page } = req.query;

  try {
    let orders = await orderModel.find();
    let totalPages = 0;
    let pageNum = 1;

    // Pagination of the orders if it is passed as part of the query
    if (page) {
      const paginatedOrder = [];

      for (let i = 0; i < orders.length; i++) {
        paginatedOrder.push(orders.splice(0, 2));
      }

      if (orders.length > 0) {
        paginatedOrder.push(orders);
      }

      const pageNumber = parseInt(page) - 1;

      if (pageNumber >= paginatedOrder.length) {
        return res.json({message: "The page you are requesting is not available"});
      }

      orders = paginatedOrder[pageNumber];
      totalPages = paginatedOrder.length;
      pageNum = page
    }

    // sort by date the order was created
    if (date_created) {
      const sortedOrders = date_created === "asc"
        ? orders.sort((a, b) => a.created_at - b.created_at)
        : date_created === "dsc"
        ? orders.sort((a, b) => b.created_at - a.created_at)
        : orders;
    
        orders = sortedOrders;
    }

    //sort by the total price of the order
    if (total_price) {
      const sortedOrders =  total_price === "asc"
        ? orders.sort((a, b) => a.total_price - b.total_price)
        : total_price === "dsc"
        ? orders.sort((a, b) => b.total_price - a.total_price)
        : orders;

        orders = sortedOrders;
    }

    //filter through the orders by state
    if (state) {
      const filteredOrders = orders.filter((order) => order.state == state);
      orders = filteredOrders;
    }

    //Results to return to user
    return res.json({ status: true, numberOfRecords: orders.length, totalPages: totalPages, pageNum: pageNum, orders });
  } catch (error) {
        return next(error);
    }
});

//Update the state of an order
pizzaRoute.patch("/order/:id", (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  order.save();

  return res.json({ status: true, order });
});


//Delete an order
pizzaRoute.delete("/order/:id", (req, res) => {
  const { id } = req.params;

  const order = orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});


module.exports = pizzaRoute;