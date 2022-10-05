const express = require("express")
const moment = require('moment')
const orderModel = require("../models/orderModel")

const orderRoute = express.Router()


orderRoute.get('/', (req, res) => {
    return res.json({ status: true})
 })
 

// create new order
orderRoute.post("/order",(req, res) => {
    const body = req.body;
    return res.json({ status: true, body })
   

//     const total_price = body.items.reduce((prev, curr) => {
//         prev += curr.price
//         return prev
//     }, 0);

//     order= orderModel.create({ 
//         items: order.items,
//         created_at: moment().toDate(),
//         total_price
//     }).then(
//         (order) =>{
//             res.json({ status: true, order })
//         }
//     ).catch(
//         (err) =>{
//             res.status(404).send(err)
//         }
//     )
    
})


// get a specific order by ID
orderRoute.get('/order/:orderId',(req, res) => {
    const { orderId } = req.params;
    const order = orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})


// get all orders
orderRoute.get('/orders', async (req, res) => {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
})

// update state of order
orderRoute.patch('/order/:id',(req, res) => {
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


// delete an order
orderRoute.delete('/order/:id', (req, res) => {
    const { id } = req.params;

    const order =orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


module.exports = orderRoute