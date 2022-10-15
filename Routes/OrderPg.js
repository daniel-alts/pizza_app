const express = require('express');
const ordersPaging = express.Router();
const OrderModel = require('../Models/OrderModel');




ordersPaging.get('/', async (req, res) => {

    const pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10
}

    const orders = await OrderModel.find().sort({"total_price":-1,"created_at":-1}).limit(pageOptions.limit).skip(pageOptions.page * pageOptions.limit).exec()


    return res.json({ status: true, orders, totalPages: Math.ceil(pageOptions.page / pageOptions.limit),currentPage: Number(pageOptions.page) })
})

module.exports = ordersPaging