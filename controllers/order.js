const orderModel = require('../models/orderModel')
const  moment = require('moment');

const getAllOrders = async (req, res, next) => {
    try {
      
      // Sort by total_price/createdAt
      const { price, date } = req.query
  
      if (price) {
        const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
        if (value) orders = await orderModel.find({}).sort({ total_price: value }).limit(limit).skip(start)
      } else if (date) {
        const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
        if (value) orders = await orderModel.find({}).sort({ created_at: value }).limit(limit).skip(start)
      }
      if (!orders) orders = await orderModel.find({}).limit(limit).skip(start)
  
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

const createOrder = async(req,res)=>{
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
}



const getOrderById = async(req,res)=>{
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

const updateOrder = async(req,res)=>{
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
}

const deleteOrder = async(req,res)=>{

         const { id } = req.params;

   const order = await orderModel.deleteOne({ _id: id})
    return res.json({ status: true, order })


}


module.exports ={
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}