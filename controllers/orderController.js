const Order = require('../models/orderModel')

// Getting information about orders

const getOrdersInfo = async (req, res, next) => {
    try {
        const orders = await Order.find({})
        const resObj = {}
        resObj.numberOfOrders = orders.length
        resObj.states = orders.reduce((prev, curr) => {
            if (!prev[curr.state]) prev[curr.state] = 0
            prev[curr.state]++
            return prev
        }, {})
        return res.json({ status: true, data: resObj})
    } catch (err) {
        next(err)
    }
}

//Getting all orders

const getAllOrder = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}