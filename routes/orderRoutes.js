const express = require('express');
const moment = require('moment');

const orderModel = require("../models/orderModel");

const pizzaRoute = express.Router();

pizzaRoute.post('/order', (req, res) => {
        const total_price = order.items.reduce((prev, curr) => {
            prev += curr.price
            return prev
        }, 0);

        const newOrder = orderModel.create({ 
            items: order.items,
            created_at: moment().toDate(),
            total_price
        })

        return res.json({ status: true, newOrder })
    })


pizzaRoute.get('/order/:orderId', (req, res) => {
        const { orderId } = req.params;
        const order = orderModel.findById(orderId)

        if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

        return res.json({ status: true, order })
    })


pizzaRoute.get('/orders', (req, res) => {
        const { state } = req.params
        const orders = orderModel.findByState().sort({total_price : 1, created_at: 1, id: { $lt: startValue } } )
            .sort( { id: -1 } )
            .limit( nPerPage )
            .forEach( orders => {
            print( orders.state );
            endValue = orders.id;
        });

        return res.json({ status: true, orders })
    })


pizzaRoute.patch('/order/:id', (req, res) => {
        const { id } = req.params;
        const { state } = req.body;

        const order = orderModel.findById(id)

        if (!order) {
        return res.status(404).json({ status: false, order: null })
        }

        if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
        }

        order.state = state;

        order.save()

        return res.json({ status: true, order })
        })


pizzaRoute.delete('/order/:id', (req, res) => {
        const { id } = req.params;

        const order = orderModel.deleteOne({ _id: id})

        return res.json({ status: true, order })
        })

        
module.exports = pizzaRoute