const e = require("express");
const express = require("express");
const orderModel = require("../models/orderModel");


const orderRoute = express.Router();



orderRoute.post('/', async (req, res) => {
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
})

orderRoute.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

orderRoute.get('/orderInfo', async (req, res) => {
    const orders = await orderModel.find({})
    const resObj = {}
    resObj.numberOfOrders = orders.length
    resObj.states = orders.reduce((obj, x) => {
      if (!obj[x.state]) obj[x.state] = 0
      obj[x.state]++
      return obj
    }, {})
    return res.json({ status: true, data: resObj })
})

orderRoute.get('/',async (req, res) => {
    let orders, returnObject = {}

    //PAGINATION
    let limitFromQuery = parseInt(req.query.limit)
    let pageFromQuery = parseInt(req.query.page)

    let limit = 5, page = 1 // default values
    if (!isNaN(limitFromQuery) && limitFromQuery > 0) limit = limitFromQuery

    const numberOfOrders = await orderModel.find().countDocuments().exec()
    const totalPages = Math.ceil(numberOfOrders / limit)
    if (!isNaN(pageFromQuery) && pageFromQuery <= totalPages ) page = pageFromQuery

    const startIndex = (page - 1) * limit
    const endIndex = page * limit



    // Sort by total_price/createdAt
    const { price, date } = req.query

    if (price) {
      const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
      if (value) orders = await orderModel.find(filter).populate('user', { username: 1 }).sort({ total_price: value }).limit(limit).skip(startIndex)
    } else if (date) {
      const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
      if (value) orders = await orderModel.find().populate('user', { username: 1 }).sort({ created_at: value }).limit(limit).skip(startIndex)
    }
    if (!orders) orders = await orderModel.find().populate('user', { username: 1 }).limit(limit).skip(startIndex)


    if (startIndex > 0) {
        returnObject.previousPage = {
          page: page - 1,
          limit: limit,
        }
    }
    returnObject.currentPage = page

    if (endIndex < numberOfOrders) {
        returnObject.nextPage = {
          page: page + 1,
          limit: limit,
        }
    }
    returnObject.totalPages = totalPages
    returnObject.orders = orders

    return res.json({ status: true, data: returnObject })
})

orderRoute.patch('/:id', async (req, res) => {
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
})

orderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


module.exports = orderRoute;