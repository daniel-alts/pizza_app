const Order = require('../models/order.model')

const createOrder = async (newOrder) => {
    
}


const updateOrder = async (_id, updates) => {
    const updated = await Order.updateOne({_id},{updates});
    return updated;
}

const deleteOrder = async (_id) => {
  const deleted = await Order.deleteOne({ _id});
  return deleted;
}

const getOrder = async (_id) => {
    const order = await Order.findById({_id})
    return order;
}

const getOrders = async () => {
    const orders = await Order.find({});
    return orders;
}