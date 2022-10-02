const express = require('express');
const orderRouter = express.Router();
const { validatePostOrder } = require('../middlewares/validator');
const { createOrder, getOrder, deleteOrder, patchOrder, getAllOrders } = require('../controllers/order.controller');

orderRouter.post('/', validatePostOrder, createOrder)

orderRouter.get('/:id', getOrder)

orderRouter.get('/', getAllOrders)

orderRouter.patch('/:id', patchOrder)

orderRouter.delete('/:id', deleteOrder)

module.exports = orderRouter;