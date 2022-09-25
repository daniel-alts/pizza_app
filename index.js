require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const orderModel = require('./models/orderModel')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ status: true })
})

/**
 * Create a new order
 */
app.post('/order', async (req, res) => {
  const body = req.body

  const total_price = body.items.reduce((prev, curr) => {
    return (prev += curr.quantity * curr.price)
  }, 0)

  const orderObject = {
    items: body.items,
    total_price,
  }

  const order = new orderModel(orderObject)
  order
    .save()
    .then((result) => {
      return res.status(201).json({ status: true, result })
    })
    .catch((err) => {
      res.status(500)
      console.log('Error creating order', err.message)
      return res.json({ error: 'Error creating order' })
    })
})

/**
 * Get order by id
 */
app.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params
  try {
    const order = await orderModel.findById(orderId)
    if (!order) {
      return res.status(404).json({ status: false, order: null })
    }
    return res.json({ status: true, order })
  } catch (err) {
    console.log(err)
  }
})

/**
 * Get all orders
 */
app.get('/orders', async (req, res) => {
  const orders = await orderModel.find({})

  return res.json({ status: true, orders })
})

/**
 * Get information about all orders
 */
app.get('/orders/info', async (req, res) => {
  const orders = await orderModel.find({})
  const resObj = {}
  resObj.numberOfOrders = orders.length
  resObj.states = orders.reduce((obj, x) => {
    if (!obj[x.state]) obj[x.state] = 0
    obj[x.state] ++
    return obj
  }, {})
  return res.json({status: true, data: resObj})
})

/**
 * Update order state
 */
app.patch('/order/:id', async (req, res) => {
  const { id } = req.params
  const { state } = req.body

  const order = await orderModel.findById(id)

  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  if (state < order.state) {
    return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
  }

  order.state = state

  await order.save()

  return res.json({ status: true, order })
})


/**
 * Delete order 
 */
app.delete('/order/:id', async (req, res) => {
  const { id } = req.params
  const order = await orderModel.findOne({ _id: id })
  const deleted = await order.remove()
  return res.json({ status: true, deleted })
})

/**
 * Connect to database
 */
const URL = process.env.URI
mongoose.connect(URL).then(() => {
  console.log(`Connection to MongoDB successful`)
}).catch(err => {
  console.log(`Connection to MongoDB failed`, err.message)
})

/**
 * Start server
 */
const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
