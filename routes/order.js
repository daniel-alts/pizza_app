const express = require("express")

const Order = require("../models/order")
const orderRouter = express.Router()
// Create new order
orderRouter.post('/', async (req, res) => {
    const orderData = req.body.order;

    try {
        const order = await Order.create({ 
            items: orderData.items,
        })

        order.total_price = order.items.reduce((prev, curr) => {
            prev += curr.price * curr.quantity
            return prev
        }, 0);
        
        await order.save()
        console.log(order)
        return res.json({ status: true, order })
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
})

// Get order by id
orderRouter.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

// Get all orders
orderRouter.get('/', async (req, res) => {
    const orders = await Order.find()

    return res.json({ status: true, orders })
})

// Update order of specific id
orderRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body.order;

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

// Delete order
orderRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await Order.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


module.exports = orderRouter