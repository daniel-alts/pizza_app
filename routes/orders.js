const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../database');
const moment = require('moment');
const orderModel = require('../models/orderModel');
const { auth } = require('../auth');


const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const ordersRouter = express.Router();

//user Authentication
ordersRouter.use(async (req, res, next) => {
    const user = await auth(req, res)
    if (user === "user"){
        next()
    }
    else {
        res.status(401).send("Not allowed")
    }
})


ordersRouter.post('/', async (req, res) => {
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

ordersRouter.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

ordersRouter.get('/', async (req, res) => {
    //page and limit sent as query parameters
    const { page = 1, limit = 2 } = req.query;

    const orders = await orderModel.find().sort({'total_price': 1, 'date_created': 1}).limit(limit * 1)
        .skip((page - 1) * limit)

     // get total documents in the orders collection 
     const count = await orderModel.countDocuments();

     // return response with orders, total pages, and current page
     res.json({
        status: true,
        orders,
        totalPages: Math.ceil(count / limit),
        currentPage: page
     })
    
})

ordersRouter.patch('/:id', async (req, res) => {
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

ordersRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

connectDB(PORT, DB_URL);


module.exports = ordersRouter