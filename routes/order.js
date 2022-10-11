const express = require("express")
const orderModel = require("../models/orderModel")
const moment = require('moment')


const orderRoute = express.Router()

orderRoute.post('/', async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((total, curr) => {
    return total += (curr.price * curr.quantity);
    
    }, 0);      
    

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
})

orderRoute.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.status(200).json({ status: true, order })
})

orderRoute.get('/', async (req, res) => {

    const {limit, page ,sortby, order="asc"} = req.query
    
    order === "desc"? orderIndex = -1 : orderIndex = 1
    const skip = (page-1) * limit
   
    if(sortby === "time"){
        const orders = await orderModel.find().sort({created_at: orderIndex}).limit(limit).skip(skip)
        
        return res.json({ status: true, orders })
    }
    if(sortby == "price"){
        const orders = await orderModel.find().sort({total_price: orderIndex}).limit(limit).skip(skip)
        
        return res.json({ status: true, orders })
    }

    if(sortby == "state"){
        const orders = await orderModel.find().sort({state: orderIndex}).limit(limit).skip(skip)
        
        return res.json({ status: true, orders })
    }
    else{
        try{ 
            const orders = await orderModel.find()
        
            return res.status(200).json({ status: true, orders })
        }
        catch(error){
            return res.status(406).send({status: false})
        }

        
    }
    
    
})

orderRoute.patch('/:id', async (req, res) => {
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

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

module.exports = orderRoute