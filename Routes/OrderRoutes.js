const express = require("express");
const orderModel = require("../Models/orderModel");
const moment = require('moment');

const orderRoute = express.Router();

orderRoute.post('/', async (req, res) => {
    const body = req.body.order;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const orders = { 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    }

    await orderModel.create(orders)
        .then((order) => {
            return res.json({ status: true, order })
        }).catch((err) => {
            return res.json({ status: false, message: err })
    })
})


orderRoute.get('/', async (req, res) => {
    const {total_price, order, created_at} = req.query;
    let totNum;
    let orderNum;
    let creNum;
    let page = 1;
    let maxi = 2;
    total_price === "asc" ? totNum = 1 : totNum = -1;
    order === "asc" ? orderNum = 1 : orderNum = -1;
    created_at === "asc" ? creNum = 1 : creNum = -1;

    await orderModel.find().sort({total_price: totNum, order: orderNum, created_at: creNum }).skip((page - 1) * maxi).limit(maxi)
        .then((order) => {
            return res.json({ status: true, order })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })
})


orderRoute.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    
    await orderModel.findById(orderId)
        .then((order)=> {
            if(!order) {
                return res.status(404).json({ status: false, order: null })
            }
            return res.json({ status: true, order }) 
        }).catch((err) => {
            return res.json({ status: false, message: err })
    }) 
})

orderRoute.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body.order;

    await orderModel.findById(id)
        .then((order) => {
            if (!order) {
                return res.status(404).json({ status: false, order: null })
            }

            if (state < order.state) {
                return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
            }

            order.state = state;

            order.save();

            return res.json({ status: true, order })
        }).catch((err) => {
            return res.json({ status: false, message: err })
    })
})

orderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await orderModel.deleteOne({ _id: id})
        .then((order) => {
            return res.json({ status: true, order, message: "Order deleted successfully" })
        }).catch((err) => {
          return res.json({ status: false, message: err })
    })
})

module.exports = orderRoute;