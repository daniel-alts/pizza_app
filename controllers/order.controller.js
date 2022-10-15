/* eslint-disable no-undef */
const express = require('express');
const orderModel = require('../models/orderModel');
const moment = require('moment');
const app = express.Router()

app.post('/', async (req, res) => {
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

app.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

app.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    let sort = req.query.sort
    let orders;
    try {
    if (!sort) {
        orders = await orderModel.find().limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    }
    if (sort === "total_price") {
        orders = await orderModel.find().sort({total_price: 1}).limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    }
    if (sort === "date_created") {
        orders = await orderModel.find().sort({created_at: 1}).limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    }  
    if(!orders) {
        return res.json({message: "No orders yet"})
    }
    const totalCount = await orderModel.countDocuments();

       res.json({
        orders,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }

})

app.get('/:state', async(req, res) => {
    const { page = 1, limit = 10 } = req.query;
    let state = req.params.state
  
  try {
    let orders = await orderModel.find().where({state: state}).limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalCount = await orderModel.countDocuments();

    res.json({
      orders,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }

})

app.patch('/:id', async (req, res) => {
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

app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})



module.exports = app;