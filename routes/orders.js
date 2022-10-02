const express = require('express');
const router = express.Router();
// import controllers
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controller/order');

router.route('/').post(createOrder);

router.route('/').get(getAllOrders);

router.route('/:orderId').get(getOrderById);

router.route('/:orderId').put(updateOrder);

router.route('/:orderId').delete(deleteOrder);

module.exports = router;
