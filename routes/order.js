const express = require("express")
const moment = require("moment")
const orderRoute = express.Router()

const orderModel = require('../modal/orderModel');


orderRoute.post('/', async (req, res) => {
    try{
    const body = req.body;
    const user_id = req.user.user_id

            const total_price = body.items.reduce((prev, curr) => {
                prev += curr.price * curr.quantity
                return prev
            }, 0);

            const order = await orderModel.create({ 
            items: body.items,
            created_at: moment().toDate(),
            total_price,
            user_id

        })
        
        return res.json({ status: true, order })

    }catch(err){
        console.log(err)
        res.status(400).send("ann error occured, check console")
    }
})

orderRoute.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

orderRoute.get('/', async (req, res) => {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
})

orderRoute.patch('/order/:id', async (req, res) => {
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
    const { user_id } = req.user
    const order = await orderModel.findById(id)

    if(order){
        if(order.user_id !== user_id){
            return res.status(403).send("You don't have authurization to delete this order")
        }
        const deletedOrder = await orderModel.deleteOne({ _id: id})

        return res.json({ status: true, deletedOrder })
    }

    return res.status(403).send("Order not found")


})


module.exports = orderRoute