const { OrderModel } = require('../models')
const moment = require('moment');

exports.createOrder = async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await OrderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
}

exports.getOrder = async (req, res) => {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

exports.getOrders  = async (req, res) => {
    const { query } = req;

    const { 
        created_at, 
        state, 
        order = 'asc', 
        order_by = 'created_at', 
        page = 1, 
        per_page = 10 
    } = query;

    const findQuery = {};

    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = state;
    }

    const sortQuery = {};

    const sortAttributes = order_by.split(',')

    for (const attribute of sortAttributes) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1
        }
    
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1
        }
    }


    const orders = await OrderModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

    return res.json({ status: true, orders })
}

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await OrderModel.findById(id)

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

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    const order = await OrderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
}
