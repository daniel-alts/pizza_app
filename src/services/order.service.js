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

const getOrders = async () => {
    const orders = await Order.find({});
    try {
        let orders, returnObject = {}
        const filter = req.user.user_type === 'admin' ? {} : { user: req.user._id }
        /**
         * check for query parameters
         */
        // Pagination
        let limitFromQuery = parseInt(req.query.limit)
        let pageFromQuery = parseInt(req.query.page)
    
        let limit = 5, page = 1 // default values
        if (!isNaN(limitFromQuery) && limitFromQuery > 0) limit = limitFromQuery
    
        const numberOfOrders = await Order.find(filter).countDocuments().exec()
        const totalPages = Math.ceil(numberOfOrders / limit)
        if (!isNaN(pageFromQuery) && pageFromQuery <= totalPages ) page = pageFromQuery
    
        const start = (page - 1) * limit
        const end = page * limit
    
        // Sort by total_price/createdAt
        const { price, date } = req.query
    
        if (price) {
          const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
          if (value) orders = await Order.find(filter).populate('user', { username: 1 }).sort({ total_price: value }).limit(limit).skip(start)
        } else if (date) {
          const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
          if (value) orders = await Order.find(filter).populate('user', { username: 1 }).sort({ created_at: value }).limit(limit).skip(start)
        }
        if (!orders) orders = await Order.find(filter).populate('user', { username: 1 }).limit(limit).skip(start)
    
        // prepare response data
        if (start > 0) {
          returnObject.previousPage = {
            page: page - 1,
            limit: limit,
          }
        }
        returnObject.currentPage = page
        if (end < numberOfOrders) {
          returnObject.nextPage = {
            page: page + 1,
            limit: limit,
          }
        }
        returnObject.totalPages = totalPages
        returnObject.orders = orders
    
        return res.json({ status: true, data: returnObject })
      } catch (err) {
        next(err)
      }
}


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}