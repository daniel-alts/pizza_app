const { Router } = require('express');
const authController = require('../controller/authController')

const router = Router();

router.get('/users', authController.getUsers);
router.post('/users', authController.addUser);
router.post('/users/login', authController.userLogin);
router.post('/order', authController.createOrder);
router.get('/order/:orderId', authController.getOrderById);
router.get('/orders', authController.getAllOrders); 
router.patch('/order/:id', authController.updateOrder); 
router.delete('/order/:id', authController.deleteOrder); 

module.exports = router;