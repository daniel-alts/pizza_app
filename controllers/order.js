const moment = require('moment');
const orderModel = require('../model/orderModel')

async function getAllOrders(req, res){
    try{
        const orders = await orderModel.find()

        return res.json({ status: true, orders })
    }catch(err){
        res.status(404).json({
            status: false,
            err
    })}
}


async function getOrderById(req, res){
    try{
        const { id } = req.params;
        
        const order = await orderModel.findById(id)
        

        if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

        return res.json({ status: true, order })
    }catch(err){
        res.status(500).json({
        status: 'Failed',
        err
    })
    }
}

async function addOrder(req, res){
    try{
        const body = req.body;

        const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);
       
    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().format('MM/DD/YYYY'),
        total_price
    })
    order.save()
    
    return res.json({ status: true, order })
    }
    catch(err){
        res.status(500).json({
            status: 'Failed',
            err
        })
    }
}


async function updateOrder(req, res){
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
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            err
        })
    }
}

async function deleteOrder(req, res){
    try{
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id})
    
        return res.json({ status: true, order })
    }
    catch(err){
        res.status(500).json({
            status: 'Failed',
            err
        })
    }
}
module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}