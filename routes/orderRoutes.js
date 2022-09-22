const express = require("express");
const router = express.Router();
const orderModel = require("./../models/orderModel");
const APIFeatures = require("./../utils/APIFeatures");
const authOrder = require("../utils/authOrder.js");
router
  .route("/")
  .get(async (req, res) => {
    try {
      await authOrder(req, res, ["admin"], orderModel);
      const features = new APIFeatures(orderModel.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const orders = await features;

      return res.json({ status: true, orders });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  })
  .post(async (req, res) => {
    try {
      await authOrder(req, res, ["admin", "user"], orderModel);

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

      return res.json({ status: true, order });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  });

router
  .route("/:orderId")
  .get(async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await orderModel.findById(orderId);

      if (!order) {
        return res.status(404).json({ status: false, order: null });
      }

      return res.json({ status: true, order });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  })
  .patch(async (req, res) => {
    try {
      await authOrder(req, res, ["admin", "user"], orderModel);
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
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  })
  .delete(async (req, res) => {
    await authOrder(req, res, ["admin"], orderModel);
    try {
      const { id } = req.params;

      const order = await orderModel.deleteOne({ _id: id });

      return res.json({ status: true, order });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  });
module.exports = router;
