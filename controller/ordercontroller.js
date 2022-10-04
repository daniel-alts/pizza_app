const orderModel = require('../model/orderModel');
const moment = require('moment');

const getAllOrders = async (req, res) => {
    const { state,page,limit } = req.query;
    const orders = await orderModel.find({state: state}).sort({total_price: 1, created_at: 1}).limit(limit * 1).skip((page-1)*limit).exec();
    return res.json({ status: true, orders });
}


const getOrdeById = async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

const createOrder = async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })

    return res.json({ status: true, order })
}

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.json({ status: true, order })
}


module.exports = {
    createOrder,
    getOrdeById,
    getAllOrders,
    updateOrder,
    deleteOrder,
}