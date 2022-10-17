const express= require('express')
const mongoose = require("mongoose")
const router = express.Router()
const orderModel = require("../models/orderModel")

router.post('/order', async (req, res) => {
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

router.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

router.get('/orders', async (req, res) => {
    // pagination limit
    const pageLimit = req.query.limit || 10
    const orders = await orderModel.find().limit(pageLimit)

    return res.json({ status: true, orders })
})

router.patch('/order/:id', async (req, res) => {
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

// Query By state
router.get("/orderby/:state", async(req,res)=>{
    const state = req.params.state;

    await orderModel.find({ state})
    .then(result =>{
        res.status(200).json({ result})
    })
    .catch(err=>{
        res.status(400).json({
            message: err
        })
    })
})

// Query all orders by date
router.get("/order/date", async (req, res)=>{
    await orderModel.find({}).
    then(result=>{
            result.sort()
    }).
    catch(err=>{
        res.status(401).send(err)
    })
})

router.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})



module.exports = router
