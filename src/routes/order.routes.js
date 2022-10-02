const { Router } = require('express');
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');
const router = Router();

router.post('/', createOrder);
router.get('/:orderId', getOrders);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
