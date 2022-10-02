const { Router } = require('express');

const router = Router();
const { getOrders } = require('../controllers/order.controller');

router.use('/order', require('./order.routes'));
router.get('/orders', getOrders);
module.exports = router;
