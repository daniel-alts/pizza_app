require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const orderModel = require('./models/orderModel')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ status: true })
})

app.post('/order', async (req, res) => {
  const body = req.body

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price
    return prev
  }, 0)

  const order = await orderModel.create({
    items: body.items,
    // created_at: moment().toDate(),
    total_price,
  })

  return res.json({ status: true, order })
})

app.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params
  const order = await orderModel.findById(orderId)

  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  return res.json({ status: true, order })
})

app.get('/orders', async (req, res) => {
  const orders = await orderModel.find()

  return res.json({ status: true, orders })
})

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

app.delete('/order/:id', async (req, res) => {
  const { id } = req.params

  const order = await orderModel.deleteOne({ _id: id })

  return res.json({ status: true, order })
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
