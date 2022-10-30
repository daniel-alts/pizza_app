// const { authentication } = require("../authentication/authenticate")
const express = require('express')
const moment = require('moment');
const orderModel = require('../models/orderModel');
// const user = require("../models/userModel");
const orderRouter = express.Router()




orderRouter.post("/",async(req, res)=>{
    const body = req.body
    const total_Price = body.items.reduce((prev, curr) => {
        prev += curr.quantity * curr.price;
        
        return prev

    }, 0)
  
    const order = await orderModel.create({
        items: body.items,
        created_at: moment().toDate(),
        total_Price

    })
    res.status(200).json({status: true, order})

}
)




orderRouter.get("/:id",async (req, res) => {
    const { orderId } = req.params;
    const user = req.body

  
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

orderRouter.get("/", async (req, res) =>{
    const {state} = req.query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit)|| 10;
    const skip = (page - 1)* limit
   
    let orders = await orderModel
    .find()
    .sort({created_at: -1})
    .sort({totalPrice: 'asc'})
    .skip(skip)
    .limit(limit)

    if(state){
        orders = orders.filter((order)=>order.state === state)
    }

    return res.json({status: true, orders})
} )


orderRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findByIdAndUpdate(id)

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

orderRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.json({ status: true, order, msg: "Order now deleted "})
})

module.exports = orderRouter;