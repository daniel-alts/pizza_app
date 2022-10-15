const moment = require('moment');
const orderModel = require('../models/orderModel')


async function makeOrder(req, res, next){
    try{
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
    } catch(err){
        next(err)
    }}

async function getOrderById(req, res, next){
    try{
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId)

        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }

        return res.json({ status: true, order })
    } catch(err){
        next(err)
    }
}

async function getAllOrders(req, res, next){
    try{
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1|| 100
        const skip = (page - 1) * limit;
        const orders = await orderModel.find().skip(skip).limit(limit)
        return res.json({ status: true, orders })

    } catch(err){
        next(err)
    }
}

async function updateOrderById(req, res, next){
    try{
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
    } catch(err){
        next(err)
    }
}

async function deleteOrderById( req, res, next){
    

    try{
        
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id})
        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }
    
        return res.json({ status: true, order })
         
    } catch(err){
        next(err)
    }
}


    
    
module.exports = {
    makeOrder,
    getOrderById,
    getAllOrders,
    updateOrderById,
    deleteOrderById
}