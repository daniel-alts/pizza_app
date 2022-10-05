const orderModel = require('../models/orderModel');
const { printOrders } = require('../middleware/utils');

//create order 
const createOrder = async(req, res) => {
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

const orderById = async(req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}



const listOrders = async(req, res) => {

    const page = req.query.page;
    const nperpage = req.query.nperpage;
    const sortby = req.query.sortby;
    const state = req.query.state;
    if (state) {
        const orders = await orderModel.find({ state: state })

        return res.json({ status: true, orders })
    }
    if (sortby === 'total_price') {
        const orders = await orderModel.find({}).sort({ "total_price": 1 })

        return res.json({ status: true, orders: orders })
    }
    if (sortby === 'date') {
        const orders = await orderModel.find({}).sort({ "created_at": 1 })

        return res.json({ status: true, orders: orders })
    } else {
        const orders = await printOrders(page || 0, nperpage || 1);

        return res.json({ status: true, orders })

    }
}

const updateOrder = async(req, res) => {
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

const deleteOrder = async(req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.json({ status: true, order })
}

module.exports = { createOrder, listOrders, deleteOrder, updateOrder, orderById }