const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/order')
const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')

async function isAuthenticated(req, res, next) {
    let authDetail = req.headers.authentication.split(" ")
    let [ , username, password, email] = authDetail
    let user = await userModel.findOne({username, password, email})

    if (!user) {
        res.status(401).send("Unauthorized access")
        return
    }

    if (req.method == "PATCH" || req.method == "DELETE") {
        if (user.user_type != "admin") {
            res.status(401).send("Unauthorized access")
            return
        }
    }

    next()
}

orderRouter.post('order', isAuthenticated, orderController.addOrder);

orderRouter.get('/order/:orderId', isAuthenticated, orderController.getOrderById);

orderRouter.get('/orders', isAuthenticated, orderController.getOrder);

orderRouter.patch('/order/:id', isAuthenticated, orderController.updateOrderById);

orderRouter.delete('/order/:id', isAuthenticated, orderController.deleteOrderById);

module.exports = orderRouter