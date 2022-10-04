const express = require("express")
const moment = require('moment');
const orderModel = require('../orderModel');
const userModel = require('../userModel');
const {authenticate} = require("../authenticate")

const orderRoute = express.Router()

orderRoute.use( async (req, res, next) => {
    // return new Promise ((resolve, reject) => {
        loginDetails = req.body
        const User = await userModel.findOne(loginDetails)  

        if (!loginDetails){
            return res.send("Please enter username and password!")
        }

        if ((loginDetails.user.password === User.password) && (loginDetails.user.username === User.username)){
           return next()
        }
        res.json({
            error: "Incorrect username or password"
        })
})

orderRoute.post('/', async (req, res) => {
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


orderRoute.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

orderRoute.get('/allorders', async (req, res) => {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
})

orderRoute.patch('/:id', async (req, res) => {
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

orderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

module.exports = orderRoute