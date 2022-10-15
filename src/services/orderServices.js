const OrderModel = require('../models/orderModel');
const moment = require('moment');
require('dotenv').config();



const createOrder = async (orderDetails) => {
    const total_price = orderDetails.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await OrderModel.create({ 
        items: orderDetails.items,
        created_at: moment().toDate(),
        total_price
    });
    return order;
}


const findOrderById = async (orderId) => {
    const order = await OrderModel.findById(orderId);
    return order;    
};


const searchOrders = async (query) => {
    const sort = {};
    if (query.sortBy) {
        sort[query.sortBy] = query.orderBy === 'desc' ? -1 : 1;
    }

    const searchBy = query.state;

    const ORDER_PAGE_LIMIT = Number(process.env.ORDER_PAGE_LIMIT);
    const ORDER_PAGE_SKIP = Number(process.env.ORDER_SKIP);
    const orders = await OrderModel.find()
    .where("state").equals(searchBy)
    .limit(ORDER_PAGE_LIMIT)
    .skip(ORDER_PAGE_SKIP)
    .sort(sort) //Sort by date created also in ASC
    .exec();
    return orders;
}


const updateOrder = async (order, state) => {
    order.state = state;
    const updatedOrder = await order.save();
    return updatedOrder;
}


const deleteOrder = async (id) => {
    const order = await OrderModel.deleteOne({ _id: id});
    return order;
}


module.exports = {
    createOrder,
    findOrderById,
    searchOrders,
    updateOrder,
    deleteOrder,
}