const Order = require('../models/order.model')

const createOrder = async (newOrder) => {
    const total_price = await newOrder.items.reduce((total, item) => {
        total += item.price;
        return total;
    }, 0)
    
    const order = new Order.model({ 
        items: newOrder.items, 
        total_price,
        created_at: moment().toDate(),
        created_by: req.user.id
                    })
    await order.save(); 
    return order;
}


const updateOrder = async (_id, updates) => {
    const updated = await Order.updateOne({_id},{updates});
    return updated;
}

const deleteOrder = async (_id) => {
  const deleted = await Order.findOneAndDelete({_id});
  return deleted;
}

const getOrder = async (_id) => {
    const order = await Order.findById({_id})
    return order;
}

const getOrders = async ({ limit, page}) => {

        const orders = await Order
        .find({})
        .limit(limit)
        .skip(limit * page)
        .exec()
        return orders;
 
}


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}