const express = require('express')
const { creatOrder, getAllOrder, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController')
const orderRoute = express.Router();
// const {authentication} = require('../authentication/authenticate')

orderRoute.post('/', creatOrder)
orderRoute.get('/',getAllOrder)
orderRoute.get("/:id",getOrderById )
orderRoute.patch("/:id", updateOrder)
orderRoute.delete("/:id", deleteOrder)


module.exports = orderRoute