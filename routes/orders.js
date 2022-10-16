const express = require('express');
const Order = require('../models/orderModel');
const moment = require('moment');
const User = require('../models/userModel');


const ordersRouter = express.Router();

ordersRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const user = req.user

        const total_price = body.items.reduce((prev, curr) => {
            prev += curr.price
            return prev
        }, 0);

        const order = new Order({ 
            items: body.items,
            created_at: moment().toDate(),
            total_price,
            user: user._id
        })

        const savedOrder = await order.save()
        const userInDB = await User.findById(user._id)
        userInDB.orders = userInDB.orders.concat(savedOrder._id)
        await userInDB.save()
        // console.log(savedOrder)
        // console.log(userInDB)
        // console.log(user)
        
        
        return res.json({ status: true, order })
    }
    catch (error){
        console.log(error)
    }
})

ordersRouter.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
});

ordersRouter.get('/', async (req, res) => {
    //page and limit sent as query parameters
    const { page = 1, limit = 2 } = req.query;

    const orders = await Order.find().sort({'total_price': 1, 'date_created': 1}).limit(limit * 1).populate('user', {firstName: 1, lastName: 1, email: 1, address: 1 })
        .skip((page - 1) * limit)

     // get total documents in the orders collection 
     const count = await Order.countDocuments();

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

    const order = await Order.findById(id)

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

    const order = await Order.deleteOne({ _id: id})

    return res.json({ status: true, order })
})




module.exports = ordersRouter