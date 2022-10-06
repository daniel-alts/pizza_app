const express =require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const Order = require("../models/orderModel");
 
 

const getAllOrders = async (req, res) => {
        const orders = await Order.find()
        return res.status(200).json({ message: orders })
    }


const createOrder = async (req, res) => {
    const body = req.body;
    
    const total_price = body.items.reduce((prev, curr) => {  
        prev += curr.price
        return prev
    }, 0);  

    const order = await Order.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    if(!order) {
        return res.status(401).json({ message: "Order is not created "})
    }
    return res.status(200).json({message: order})
}



const getOrderByID = async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId) 

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }
        return res.json({ status: true, order })
}


const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { state } = req.body;

    const order = await Order.findById(orderId)

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
        const { orderId } = req.params;
    
        const order = await Order.deleteOne({ _id: orderId})
    
        return res.json({ status: true, order }) 
    }
        


    module.exports = {
        getAllOrders,
        createOrder,
        getOrderByID,
        updateOrder,
        deleteOrder
    }