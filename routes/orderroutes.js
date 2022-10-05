const router = require('express').Router();
const { isAuthenticatedforlogin, isAuthenticated } = require('../middleware/utils');
const order = require('../controllers/orders');

//create order route
router.post('/order', isAuthenticated, order.createOrder);

router.get('/order/:orderId', isAuthenticated, order.orderById);



router.post('/orders', isAuthenticated, order.listOrders);

router.patch('/order/:id', isAuthenticated, order.updateOrder);

router.delete('/order/:id', isAuthenticated, order.deleteOrder);


module.exports = router;