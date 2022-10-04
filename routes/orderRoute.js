const { addOrder, getOrderById, getOrders, updateOrder, deleteOrder, getOrdersByTP, getOrdersByTime, getOrdersByState } = require('../Controller/orderController');
const express = require('express');
const orderRoute = express.Router();
const { authUser } = require('../auth/authenticate');

express.Router().get('/', (req, res) => {
    return res.json({ status: true })
})


orderRoute.get('/', getOrders)

orderRoute.get('/total-price', getOrdersByTP)

orderRoute.get('/created-at', getOrdersByTime)

orderRoute.get('/q', getOrdersByState)

orderRoute.post('/', authUser, addOrder)

orderRoute.get('/:id', getOrderById)

orderRoute.patch('/:id', authUser, updateOrder)

orderRoute.delete('/:id', authUser, deleteOrder)

module.exports = orderRoute;