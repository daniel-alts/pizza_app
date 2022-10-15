const orderService = require('../services/order.service');
const moment = require('moment');


const getOrders = async (req, res) => {
    const orders = await orderService.getOrders();
    res.json({ success: true, orders})
}

const getOrder = async (req, res) => {
    const { _id } = req.params;
    const order = await orderService.getOrder(_id);
    res.json({ success: true, order})
}


const createOrder = async(req, res) => {
    const newOrder = req.body;
    const order = await orderService.createOrder(newOrder)
    res.json({ success: true, order})
}

const deleteOrder = async (req, res) => {
    const { _id } = req.params;
    const deletedOrder = await orderService.deleteOrder(_id);
    res.json({ success: true, deletedOrder });
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