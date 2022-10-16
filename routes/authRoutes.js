const { Router } = require('express');
const userController = require('../controller/userController')
const orderController = require('../controller/orderController')

const router = Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.post('/users/login', userController.userLogin);
router.post('/order', orderController.createOrder);
router.get('/order/:orderId', orderController.getOrderById);
router.get('/orders', orderController.getAllOrders); 
router.patch('/order/:id', orderController.updateOrder); 
router.delete('/order/:id', orderController.deleteOrder); 

module.exports = router;