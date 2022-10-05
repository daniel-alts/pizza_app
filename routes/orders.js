const express = require("express");
const orderModel = require("../models/orderModel");
const orderRouter = express.Router();
const {
  authenticateUser,
  authorizeUser,
} = require("../authentication/authenticate");

// Get all Orders
orderRouter.get("/", async (req, res, next) => {
  await authenticateUser(req, res, next);

  const authenticatedUser = req.authenticatedUser;

  if (!authenticatedUser) {
    return res
      .status(403)
      .json({ status: false, message: "Username or Password is incorrect" });
  }

  await authorizeUser(["admin"], authenticatedUser, req);

  const haveAccess = req.access;

  if (!haveAccess) {
    return res.status(401).json({
      status: false,
      message: "You are not authorized to access this resource",
    });
  }

  let orders;
  console.log(req.query);

  const { page, count, state, sortBy, order } = req.query;

  const query = state ? { state } : {}; // query by a state if provided

  if (sortBy === "total_price" && order === "asc") {
    orders = await orderModel
      .find(query)
      .sort({ total_price: 1 })
      .skip(page > 0 ? page : 0)
      .limit(parseInt(count));
  } else if (sortBy === "total_price" && order === "desc") {
    orders = await orderModel
      .find(query)
      .sort({ total_price: -1 })
      .skip(page > 0 ? page : 0)
      .limit(parseInt(count));
  } else if (sortBy === "date" && order === "asc") {
    orders = await orderModel
      .find(query)
      .sort({ created_at: 1 })
      .skip(page > 0 ? page : 0)
      .limit(parseInt(count));
  } else if (sortBy === "date" && order === "desc") {
    orders = await orderModel
      .find(query)
      .sort({ created_at: -1 })
      .skip(page > 0 ? page : 0)
      .limit(parseInt(count));
  }

  orders = await orderModel
    .find(query)
    .sort({ total_price: -1 })
    .skip(page > 0 ? page : 0)
    .limit(parseInt(count));

  return res.json({ status: true, orders });
});

// Get Order by ID
orderRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    await authenticateUser(req, res, next);

    const authenticatedUser = req.authenticatedUser;

    if (!authenticatedUser) {
      return res
        .status(403)
        .json({ status: false, message: "Username or Password is incorrect" });
    }

    await authorizeUser(["user", "admin"], authenticatedUser, req);

    const haveAccess = req.access;

    if (!haveAccess) {
      return res.status(401).json({
        status: false,
        message: "You are not authorized to access this resource",
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.json({ status: true, order });
  } catch (err) {
    console.log(err);
  }
});

// Make an Order
orderRouter.post("/", async (req, res, next) => {
  await authenticateUser(req, res, next);

  const authenticatedUser = req.authenticatedUser;

  if (!authenticatedUser) {
    return res
      .status(403)
      .json({ status: false, message: "Username or Password is incorrect" });
  }

  await authorizeUser(["user", "admin"], authenticatedUser, req);

  const haveAccess = req.access;

  if (!haveAccess) {
    return res.status(401).json({
      status: false,
      message: "You are not authorized to access this resource",
    });
  }

  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    const quantity = curr.quantity;
    prev += curr.price;
    return prev * quantity;
  }, 0);

  try {
    const order = await orderModel.create({
      items: body.items,
      created_at: new Date(),
      total_price,
    });

    return res.json({ status: true, order });
  } catch (err) {
    console.log(err);
  }
});

// Edit an Order
orderRouter.patch("/:id", async (req, res, next) => {
  await authenticateUser(req, res, next);

  const authenticatedUser = req.authenticatedUser;

  if (!authenticatedUser) {
    return res
      .status(403)
      .json({ status: false, message: "Username or Password is incorrect" });
  }

  await authorizeUser(["user", "admin"], authenticatedUser, req);

  const haveAccess = req.access;

  if (!haveAccess) {
    return res.status(401).json({
      status: false,
      message: "You are not authorized to access this resource",
    });
  }

  const { id } = req.params;
  const { state } = req.body;

  try {
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
  } catch (err) {
    console.log(err);
  }
});

// Delete an Order
orderRouter.delete("/:id", async (req, res, next) => {
  try {
    await authenticateUser(req, res, next);

    const authenticatedUser = req.authenticatedUser;

    if (!authenticatedUser) {
      return res
        .status(403)
        .json({ status: false, message: "Username or Password is incorrect" });
    }

    await authorizeUser(["user", "admin"], authenticatedUser, req);

    const haveAccess = req.access;

    if (!haveAccess) {
      return res.status(401).json({
        status: false,
        message: "You are not authorized to access this resource",
      });
    }
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id });

    return res.json({ status: true, order });
  } catch (err) {
    console.log(err);
  }
});

module.exports = orderRouter;
