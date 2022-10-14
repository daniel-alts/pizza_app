const Order = require('../models/orderModel')

/**
 * Get information about all orders
 */
const getOrdersInfo = async (req, res, next) => {
  try {
    const orders = await Order.find({})
    const resObj = {}
    resObj.numberOfOrders = orders.length
    resObj.states = orders.reduce((obj, x) => {
      if (!obj[x.state]) obj[x.state] = 0
      obj[x.state]++
      return obj
    }, {})
    return res.json({ status: true, data: resObj })
  } catch (err) {
    next(err)
  }
}

/**
 * Get all orders
 */
const getAllOrders = async (req, res, next) => {
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

/**
 * Get order by id
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await Order.findById(id)
    if (!order) {
      return res.status(404).json({ status: false, data: null })
    }
    return res.json({ status: true, data: order })
  } catch (err) {
    next(err)
  }
}

/**
 * Create a new order
 */
const createOrder = async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user

    const total_price = body.items.reduce((prev, curr) => {
      return (prev += curr.quantity * curr.price)
    }, 0)

    const orderObject = {
      items: body.items,
      created_at: new Date(),
      total_price,
      user: user._id
    }

    const order = new Order(orderObject)
    const savedOrder = await order.save()

    user.orders = user.orders.concat(savedOrder._id)
    await user.save()

    return res.status(201).json({ status: true, data: savedOrder })
  } catch (err) {
    next(err)
  }
}

/**
 * Update order state
 */
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const { state } = req.body

    const order = await Order.findById(id)

    if (!order) {
      return res.status(404).json({ status: false, data: null })
    }

    if (state < order.state) {
      return res.status(422).json({ status: false, data: null, message: 'Invalid operation' })
    }

    order.state = state

    await order.save()

    return res.json({ status: true, data: order })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

/**
 * Delete order
 */
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params

    const order = await Order.findOne({ _id: id })
    const deleted = await order.remove()
    if (deleted) {
      return res.status(204).json({ status: true })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { getOrdersInfo, getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder }
