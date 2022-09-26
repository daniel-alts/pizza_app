const express = require("express");
const moment = require('moment');
const orderModel = require("../orderModel");
const auth = require("../middlewares/auth");

const ordersRouter = express.Router();

ordersRouter.post('/', auth, async (req, res) => {
    const body = req.body;
    const {items} = body;
    if(!items){
        return res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    return res.status(201).json({ status: true, order })
})

ordersRouter.get('/:orderId', auth, async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

ordersRouter.get('/', auth, async (req, res) => {
    let { page=1, order="desc" } = req.query;
    let order_index;
    order === "asc" ? order_index = 1 : order_index = -1
    page = parseInt(page);
    const MAX_ITEMS = 2
    const orders = await orderModel.find().sort({created_at: order_index, total_price: order_index}).skip((page - 1) * MAX_ITEMS).limit(MAX_ITEMS);
    return res.json({ status: true, orders })
})

ordersRouter.patch('/:id',auth, async (req, res) => {
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

ordersRouter.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try{
        const order = await orderModel.deleteOne({ _id: id})
        if(!order.deletedCount){
            throw new Error();
        }
        return res.json({ status: true, order })
    }catch(err){
        return res.status(404).json({ status: false, order: null })
    }
})


module.exports = ordersRouter