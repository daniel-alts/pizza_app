const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/order')
const { userModel } = require('../models/userModel')

orderRouter.use(express.json())

orderRouter.use(async (req, res, next) => {
    const user = await userModel.findById(req.user._id)
    const { user_type } = user
    if (req.method == "PATCH" || req.method == "DELETE") {
        if (user_type != "admin") {
            res.status(401).send("Unauthorized access")
            return
        }
    }
    next()
})
orderRouter.post('/', orderController.addOrder);

orderRouter.get('/:orderId', orderController.getOrderById);

orderRouter.get('/', orderController.getOrder);

orderRouter.patch('/:id', orderController.updateOrderById);

orderRouter.delete('/:id', orderController.deleteOrderById);

module.exports = orderRouter