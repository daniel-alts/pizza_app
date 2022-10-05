const express = require("express");
const moment = require("moment");
const userModel = require("../Models/orderModel")
// const userModel = require("../Models/userModel")
// const {authUser}= require("../middleware/auth")


const userRouter = express.Router()



// CRUD routes

userRouter.get('/', async (req, res) => {
    const orders = await userModel.find()
    return res.status(200).json({ status: 'Success', data : {orders} })
})


userRouter.post('/', async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await userModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
})

userRouter.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await userModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

// userRouter.get('/', async (req, res) => {
//     const orders = await userModel.find()

//     return res.json({ status: true, orders })
// })

userRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await userModel.findById(id)

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

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await userModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

module.exports = userRouter