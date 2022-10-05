const express = require('express');
const orderModel = require('../Model/orderModel')
const ordersRoute = express.Router()

ordersRoute.get ('/', async (req, res)=>{
    const {page, limit} = req.query;

    const orders = await orderModel.find().sort({"total_price":-1, "created_at":-1}).limit(limit * 1).skip ((page - 1) * limit).exec();

    return res.json({ status:true, orders, totalPages: Math.ceil(page / limit), currentPage: page})
})

module.exports = ordersRoute