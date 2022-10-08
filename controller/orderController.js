const moment = require('moment');
const { orderModel } = require('../models/orderModel');

async function getOrders(req, res) {
    var page = req.query.page * 1 || 1;
    var limit = req.query.limit * 1 || 100;
    var skip = (page - 1) * limit;
    var orders = await orderModel.find({}).skip(skip).limit(limit)
    return res.json({ status: true, orders })
}

async function getOrdersByTP(req, res) {
    const asc = await orderModel.find({}).sort({ total_price: -1 })
    return res.json({ status: true, asc })
}

async function getOrdersByTime(req, res) {
    const asc = await orderModel.find({}).sort({ created_at: -1 })
    return res.json({ status: true, asc })
}

async function getOrdersByState(req, res) {
    const state = req.query.state;
    // const parsedState = parseInt(state)
    const orders = await orderModel.find({ "state": state })
    return res.status(200).json(orders)
}

async function getOrderById(req, res) {
    const { id } = req.params;
    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

async function addOrder(req, res) {
    const body = req.body;
    console.log(body)

    const total_price = await body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({
        state: body.state,
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })

    return res.status(200).send(`order added successfully!!! ${order}`)
}

async function updateOrder(req, res) {
    const { id } = req.params;
    const { state } = req.body
    const body = req.body;

    const order = await orderModel.findByIdAndUpdate(id, body, { new: true })

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })

    }
    // total_price = order.items

    await order.save()

    return res.status(200).send(`order updated successfully!!! ${order}`)
}

async function deleteOrder(req, res) {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.status(200).send(`order deleted successfully`)
}

module.exports = {
    addOrder,
    getOrderById,
    getOrders,
    updateOrder,
    deleteOrder,
    getOrdersByTP,
    getOrdersByTime,
    getOrdersByState
}