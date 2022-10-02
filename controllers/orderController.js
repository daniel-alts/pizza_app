const orderModel = require('../models/order');
const moment = require('moment');

async function order(req, res, next) {
    try {
        const body = req.body

        const total_price = body.items.reduce((prev, curr) => {
            prev += curr.price
            return prev
        }, 0)

        const order = await orderModel.create({
            items: body.items,
            created_at: moment().toDate(),
            total_price
        })
        return res.status(201).json({ status: true, order })
    } catch (error) {
        error.type = 'Bad Request'
        next(error)
    }
}

async function getOrderById(req, res, next) {
    try {
        const { orderId } = req.params;

        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(400).json({ status: false, message: "Order ID not valid", order: null })
        }

        return res.json({ status: true, order })
    } catch (error) {
        error.type = 'Not Found'
        next(error)
    }
}

async function getAllOrder(req, res, next) {
    try {
        // Offset based pagination
        const { page, limit, total_price, created_at, state } = req.query

        // execute query with page and limit values
        const orders = await orderModel.find({}).sort({ total_price: total_price, created_at: created_at, state: state }).limit(limit * 1).skip((page - 1) * limit).exec()

        // get total documents in the Orders 
        const count = await orderModel.count()

        return res.status(200).json({ status: true, orders, totalPages: Math.ceil(count / limit), currentPage: page })
    } catch (error) {
        error.type = 'Bad Request'
        next(error)
    }
}

async function updateOrder(req, res) {
    try {
        const { id } = req.params;
        const { state } = req.body

        const order = await orderModel.findById(id)
        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }

        if (state < order.state) {
            return res.status(422).json({ status: false, order: null, message: "Invalid Operation" })
        }

        order.state = state

        await order.save()

        return res.json({ status: true, order })
    } catch (error) {
        error.type = 'Internal Server Error'
        next(error)
    }
}

async function deleteOrder(req, res) {
    try {
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id })

        return res.json({ status: true, order })
    } catch (error) {
        error.type = 'Internal Server Error'
        next(error)
    }
}

module.exports = {
    order,
    getOrderById,
    getAllOrder,
    updateOrder,
    deleteOrder
}