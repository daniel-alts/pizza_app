const { Router } = require('express');
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

const router = Router();

router.post('/create', createOrder);
router.get('/:orderId', getOrders);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/orders', getOrders);

module.exports = router;
