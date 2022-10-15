const { authenticate } = require('../auth');
const { createOrder, findAllOrders, findSingleOrder, patchSingleOrder, deleteSingleOrder } = require('./controller');

const router = require('express').Router();

router.use(authenticate);

router.post('/', createOrder);

router.get('/', findAllOrders);

router.route('/order/:id')
      .get(findSingleOrder)
      .patch(patchSingleOrder)
      .delete(deleteSingleOrder)

module.exports = router;