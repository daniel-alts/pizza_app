const express = require('express')
const orderModel = require('../model/orderModel')
const moment = require('moment');
const orderRouter = express.Router()

//get all orders
orderRouter.get('/', async (req, res) => {

    //setting number of orderss to be shown on a page
    const {page= 1, limit = 5}= req.query

    try{
        const orders = await orderModel.find()
            .limit(limit * 1)
            .skip((page-1) * limit)
            .exec()

        const count = await orderModel.countDocuments()

        return res.json({
            status: true,
            orders,
            totalPages: Math.ceil(count / limit),
            page: page
        })
    }catch (err){
        console.log(err)
    }


})

//get one order
orderRouter.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

//create an order
orderRouter.post('/', async (req, res) => {
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

//update order
orderRouter.patch('/:id', async (req, res) => {
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

//delete order

orderRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

module.exports = orderRouter