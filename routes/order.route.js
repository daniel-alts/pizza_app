const orderRouter = require('express').Router();
const orderController = require('../controllers/orders.controller');
const authenticate = require('../middlewares/authenticate');

// Orders Routes
orderRouter.get('/', orderController.getOrders);
orderRouter.get('/:orderId', orderController.getOrderById);
orderRouter.post('/', authenticate(['admin', 'user']), orderController.makeOrder);
orderRouter.put('/:id', authenticate(['admin']), orderController.updateOrder);
orderRouter.delete('/:id', authenticate(['admin', 'user']), orderController.deleteOrder);

module.exports = orderRouter;
