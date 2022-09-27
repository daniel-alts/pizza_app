const express = require("express");
const router = express.Router();
const orderSchema = require("./../Schema/orderSchema");
const APIFeatures = require("./../utilis/APIfeatures");
const authOrder = require("../utilis/authOrder");
const moment = require("moment");
router
  .route("/")
  .get(async (req, res) => {
    try {
      await authOrder(req, res, ["admin"]);
      const features = new APIFeatures(orderModel.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const orders = await features.query;

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
      await authOrder(req, res, ["admin", "user"]);

      const body = req.body;

      const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price * curr.quantity;
        return parseInt(prev);
      }, 0);

      const order = await orderSchema.create({
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
      await authOrder(req, res, ["admin", "user"]);
      const { orderId } = req.params;
      const state = req.body.updateData.state;

      const order = await orderModel.findById(orderId);
      console.log(order);
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
    await authOrder(req, res, ["admin"]);
    try {
      const { orderId } = req.params;

      const order = await orderModel.deleteOne({ _id: orderId });

      return res.json({ status: true, order });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  });
module.exports = router;