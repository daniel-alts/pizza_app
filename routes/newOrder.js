const express = require('express')
const orderModel = require('../models/orderModel');
const moment = require('moment');
const order = express.Router()


order.get('/', async (req, res) => {
    order = orderModel.find({})
    return res.json({order})
})

order.post('/', async (req, res) =>{
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += (curr.price * curr.quantity)
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
})

module.exports = order