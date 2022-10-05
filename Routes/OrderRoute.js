const express = require('express');
const moment = require('moment');
const OrderRouter = express.Router()
const OrderModel = require ('../Models/OrderModel')




OrderRouter.post('/', async (req, res) => {
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
})


OrderRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await OrderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})






OrderRouter.patch('/:id', async (req, res) => {
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
})



OrderRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await OrderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


module.exports = OrderRouter