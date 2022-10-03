const OrderModel = require('../models/orderModel');



const createOrder = async (orderDetails) => {
    const { items } = orderDetails.items;
    const total_price = items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await OrderModel.create({ 
        items: orderDetails,
        created_at: moment().toDate(),
        total_price
    });
    return order;
}


const findOrderById = async (orderId) => {
    const order = await OrderModel.findById(orderId);
    return order;    
};


const getAllOrders = async () => {
    const orders = await OrderModel.find();
    return orders;
}

const updateOrder = async (order, state) => {
    order.state = state;
    const updatedOrder = await order.save();
    return updatedOrder;
}


const deleteOrder = async (id) => {
    const order = await OrderModel.deleteOne({ _id: id });
    return order;
}


module.exports = {
    createOrder,
    findOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder,
}