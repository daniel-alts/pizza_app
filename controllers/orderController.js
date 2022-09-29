const orderModel = require('../models/order');
const moment = require('moment');

async function order(req, res) {
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
        return res.json({ status: true, order })
    } catch (error) {
        return res.json({ status: false, error })
    }

}

async function getOrderById(req, res) {
    try {
        const { orderId } = req.params;

        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }

        return res.json({ status: true, order })
    } catch (error) {
        return res.json({ status: false, error })
    }
}

async function getAllOrder(req, res) {
    try {
        let query = req.query

        const orders = await orderModel.find({}).sort(query)

        return res.json({ status: true, orders })
    } catch (error) {
        return res.status(400).json({ status: false, message: "Invalid query parameter" })
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
        return res.json({ status: false, error })
    }
}

async function deleteOrder(req, res) {
    try {
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id })

        return res.json({ status: true, order })
    } catch (error) {
        return res.json({ status: false, error })
    }
}

module.exports = {
    order,
    getOrderById,
    getAllOrder,
    updateOrder,
    deleteOrder
}