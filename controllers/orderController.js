const orderModel = require('../models/order');
const moment = require('moment');

async function order(req, res) {
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
    return res.json({ status: true, order })
}

async function getOrderById(req, res) {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId)
    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

async function getAllOrder(req, res) {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
}

async function updateOrder(req, res) {
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
}

async function deleteOrder(req, res) {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.json({ status: true, order })
}

module.exports = {
    order,
    getOrderById,
    getAllOrder,
    updateOrder,
    deleteOrder
}