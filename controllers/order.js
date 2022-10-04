const orderModel = require('../models/orderModel');
const moment = require('moment')

async function addOrder(req, res) {
    const body = req.body;
    const countUsers = await orderModel.count({})
    if (countUsers == 0) body._id = 1
    else body._id = countUsers + 1
    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price * curr.quantity
        return prev
    }, 0);

    const order = await orderModel.create({ 
        _id: body._id,
        items: body.items,
        created_at: moment().toDate(),
        total_price,
        location: body.location,
        phoneNo: body.phoneNo,
        user: res.locals.user
    })
    
    return res.json({ status: true, order: {items: order.items, total_price: order.total_price} })
}

async function getOrder(req, res) {
    let orders 
    if (req.query?.sort_by) {
        // console.log("hello")
        let {sort_by, order = "asc"} = req.query

        let allOrders = {
            asc: 1,
            desc: -1,
        }

        if (sort_by.includes(",")) {
            sort_by = sort_by.split(",")
            orders = await orderModel.find({user: res.locals.user}).sort({[ sort_by[0] ]: allOrders[order], [ sort_by[1] ]: allOrders[order]})
        } else {
            orders = await orderModel.find({user: res.locals.user}).sort({[ sort_by ]: allOrders[order]})
        }
    } else {
        orders = await orderModel.find({user: res.locals.user})
    }
    

    if (Array.isArray(orders)) {
        orders = orders.map(order => ({_id: order._id, state: order.state, total_price: order.total_price, items: order.items}))
    }
    return res.json({ status: true, orders })
}

async function getOrderById(req, res) {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (order.user.email != res.locals.user.email) return res.status(404).json({ status: false, order: "Wrong id" })

    const {_id, state, total_price, items} = order

    return res.json({ status: true, order: {_id, state, total_price, items} })
}

async function updateOrderById(req, res) {
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

async function deleteOrderById(req, res) {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
}

module.exports = {
    addOrder,
    getOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById
}