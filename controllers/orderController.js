const { authentication } = require("../authentication/authenticate")
const moment = require('moment');
const orderModel = require('../models/orderModel');
const user = require("../models/userModel");




async function creatOrder(req, res){
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





const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    const user = req.body

  
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

const getAllOrder = async (req, res) =>{
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
} 


const updateOrder = async (req, res) => {
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
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.json({ status: true, order, msg: "Order now deleted "})
}

module.exports = {creatOrder, getOrderById,deleteOrder,updateOrder, getAllOrder}