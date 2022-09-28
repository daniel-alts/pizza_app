const express = require('express');
const moment = require('moment');
const orderModel = require('../models/orderModel');

const ordersRouter = express.Router()

// create order
ordersRouter.post('/order', async (req, res) => {
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
})

// get all orders by id
ordersRouter.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

// get all orders
ordersRouter.get('/orders', async (req, res) => {

    const {sort,state}= req.query

    const queryObj = {}
    if(state){
        queryObj.state=state
    }

    let orders = orderModel.find(queryObj)
    if(sort){
        orders = orders.sort(sort)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 2
    const skip = (page-1)*limit

    orders = await orders.skip(skip).limit(limit)
    return res.json({ status: true, orders })
})

// update order by id
ordersRouter.patch('/order/:id', async (req, res) => {
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
})

// delete orders by id
ordersRouter.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

module.exports = ordersRouter
