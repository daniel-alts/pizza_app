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


const searchOrders = async (req, res, query) => {
    const orders = await orderServices.searchOrders(query);

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

    if (order) {
        return res.json({ status: true, order });
    } else {
        return res.status(404).json({ status: false, message: "Record does not exit." });
    }
    
}



module.exports = {
    createOrder,
    getOrderById,
    searchOrders,
    updateOrder,
    deleteOrder,
}