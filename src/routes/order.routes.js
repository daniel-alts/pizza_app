const { Router } = require('express');
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

const router = Router();

router.post('/order', createOrder);
router.get('/:orderId', getOrders);
router.patch('/', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/orders', getOrders);

module.exports = router;
