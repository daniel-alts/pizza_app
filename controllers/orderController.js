const express = require("express")
const moment = require('moment');
const orderModel = require('../models/orderModel');
const { authenticateUser } = require("../middleware/auth")

exports.createOrder =  async(req, res) => {
    try{
        await authenticateUser(req, res, ["admin", "user"], orderModel)
        const body = req.body;

        const total_price = body.items.reduce((prev, curr) => {
            prev += curr.price;
            prev += curr.price * curr.quantity;
            return prev;
        }, 0)
        const order = await orderModel.create({ 
            items: body.items,
            created_at: moment().toDate(),
            total_price
        })
        
        return res.json({ status: true, order })
    } catch (error) {
        res.json({
            status: false,
            message: error
        })
    }

}

exports.getaSingleOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId)
    
        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }
    
        return res.json({ status: true, order })
    } catch(error) {
        res.json({
            status: false,
            message: error
        })
    }
}

exports.getAllOrder =  async (req, res) => {
    try {
        await authentication(req, res, ["admin"], orderModel);
        
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
    } catch (error){
        res.json({
            status: false,
            message: error
        })
    } 
}


exports.updateOrder = async (req, res) => {
    try{
        await authenticateUser(req, res, ["admin", "user"], orderModel)
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
    } catch (error) {
        res.json({
            status: false,
            message: error
,
        })
    }
}

exports.cancelOrder=  async (req, res) => {
   await authenticateUser(req, res, ["admin"], orderModel);
   try {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
   } catch (error) {
    res.json({
        status: false,
        message: error
    })
   }
}
