const { Router } = require('express');
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');
const { basicAuthentication } = require('../config/auth');
const router = Router();

router.post('/order', basicAuthentication, createOrder);
router.get('/:orderId', basicAuthentication, getOrders);
router.patch('/:id', basicAuthentication, updateOrder);
router.delete('/:id', basicAuthentication, deleteOrder);
router.get('/orders', basicAuthentication, getOrders);

module.exports = router;
