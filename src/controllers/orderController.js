const orderServices = require('../services/orderServices');


const createOrder =  async (req, res, orderDetails) => {
    const order = await orderServices.createOrder(orderDetails);
    if (order) {
        return res.status(201).json({ status: true, order });
    }
};


const getOrderById = async (req, res, orderId) => {
    const order = await orderServices.findOrderById(orderId);
    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}


const getAllOrders = async (req, res) => {
    const orders = await orderServices.getAllOrders();
    return res.json({ status: true, orders })
}


const updateOrder = async (req, res, id, state) => {
    const order = await orderServices.findOrderById(id);
    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }
    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }
    const updatedOrder = await orderServices.updateOrder(order, state);
    return res.json({ status: true, updatedOrder });
}


const deleteOrder = async (req, res, id) => {
    const order = await orderServices.deleteOrder(id);
    return res.json({ status: true, order });
}



module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder,
}