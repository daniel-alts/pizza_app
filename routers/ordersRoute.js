const express = require('express');
const ordersRouters = express.Router();
const orderModel = require('../model/orderModel');




ordersRouters.get('/', async (req, res) => {

    const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
}

    const orders = await orderModel.find().sort({"total_price":-1,"created_at":-1}).limit(pageOptions.limit).skip(pageOptions.page * pageOptions.limit).exec()


    return res.json({ status: true, orders, totalPages: Math.ceil(pageOptions.page / pageOptions.limit),currentPage: Number(pageOptions.page) })
})

module.exports = ordersRouters