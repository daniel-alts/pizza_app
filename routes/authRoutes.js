const { Router } = require('express');
const authController = require('../controller/authController')

const router = Router();

router.get('/users', authController.users_get);
router.post('/users', authController.users_post);
router.post('/users/login', authController.users_login_post);
router.post('/order', authController.order_post);
router.get('/order/:orderId', authController.order_post);
router.get('/orders', authController.orders_get); 
router.patch('/order/:id', authController.order_id_patch); 
router.delete('/order/:id', authController.order_id_delete); 

module.exports = router;