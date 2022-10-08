const { addOrder, getOrderById, getOrders, updateOrder, deleteOrder, getOrdersByTP, getOrdersByTime, getOrdersByState } = require('../controller/orderController');
const express = require('express');
const orderRoute = express.Router();
// const { authUser } = require('../authentication/auth');

express.Router().get('/', (req, res) => {
    return res.json({ status: true })
})


orderRoute.get('/', getOrders)

orderRoute.get('/total-price', getOrdersByTP)

orderRoute.get('/created-at', getOrdersByTime)

orderRoute.get('/q', getOrdersByState)

orderRoute.post('/', addOrder)

orderRoute.get('/:id', getOrderById)

orderRoute.patch('/:id', updateOrder)

orderRoute.delete('/:id', deleteOrder)

module.exports = orderRoute;