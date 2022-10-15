const moment = require('moment');
const { BadRequest } = require('../error');

const Order = require("./model");

exports.createOrder = async (req, res) => {
    const body = req.body;

    if (body.items === undefined) return BadRequest(res, 'Items is required!');

    if (Array.isArray(body.items) && body.items.length === 0) return BadRequest(res, 'Items cannot be empty!');

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await Order.create({ 
        items: body.items,
        total_price
    })
    
    return res.json({ status: true, order })
};

exports.findAllOrders = async (req, res) => {
    const { sort, page, limit, ...rest } = req.query;

    const ordersQuery = Order.find(rest);

    if (sort) {
        const values = sort.split(',').join(' ');
        ordersQuery.sort(values);
    }

    if (page && limit) {
        const current = +page;
        const limitBy = +limit;

        const skip = (current - 1) * limitBy;

        ordersQuery.skip(skip).limit(limit);
    }

    const orders = await ordersQuery;

    return res.json({ status: true, orders })
}

exports.findSingleOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

exports.patchSingleOrder = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await Order.findById(id)

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

exports.deleteSingleOrder = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    return res.json({ status: true, order })
}