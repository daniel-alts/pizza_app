const orderService = require('../services/order.service');

const getOrders = async (req, res) => {
    const orders = await orderService.getOrder();
    return orders;
}

const getOrder = async (req, res) => {
    const { _id } = req.params;
    const order = await orderService.getOrder(_id)
}


const createOrder = async(req, res) => {
    const newOrder = req.body;
    const order = await orderService.createOrder(newOrder)
}

const deleteOrder = async (req, res) => {
    const { _id } = req.params;
    const deletedOrder = await orderService.deleteOrder(_id);
    res.json({ status: true, order: deletedOrder });
}

const updateOrder = async (req, res) => {
    const { _id, state } = req.body;
    const order = await orderService.updateOrder(_id, state);
    res.json({ status: true, order})
}