const orderService = require('../services/order.service');
const moment = require('moment');


const getOrders = async (req, res) => {
    try{
    const { limit , page } = req.query;
    const orders = await orderService.getOrders({limit, page});
    
    res.json({
        success: true,
        orders: orders,
        page: page,
        limit: limit,
        pages: (orders.length) / limit
    })
    }catch(error){
        console.log(error)
        res.json({ error: true, message: "Internal Server Error"})
    }
}

const getOrder = async (req, res) => {
    const { _id } = req.params;
    const order = await orderService.getOrder(_id);
    res.json({ success: true, order})
}


const createOrder = async(req, res) => {
    try{

    const newOrder = req.body;
    const order = await orderService.createOrder(newOrder)
    res.json({ success: true, order})
    }catch(error){
        res.json({ error: true, message: "Internal Server Error"})
    }
}

const deleteOrder = async (req, res) => {
    try{
        const { _id } = req.params;
    const deletedOrder = await orderService.deleteOrder(_id);
    res.json({ success: true, deletedOrder });
}catch(error){
    res.json({ error: true, message: "Internal Server Error"})
}
}

const updateOrder = async (req, res) => {
    const { _id, state } = req.body;
    const order = await orderService.updateOrder(_id, state);
    res.json({ success: true, order})
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}