const express = require('express')
const router = express.Router()
const orderModel = require('../models/orderModel')
const authenticate = require('../middleware/authenticate')

/**
 * Get information about all orders
 */
router.get('/info', authenticate, async (req, res, next) => {
  // check for authenticated user
  const authenticatedUser = req.authenticatedUser;

  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  if(authenticatedUser.role !== 'admin') {
    return res.status(401).send({message: 'Unauthorised'});
  }

  try {
    const orders = await orderModel.find({})
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
})

/**
 * Get all orders
 */
router.get('/', authenticate, async (req, res, next) => {
  // check for authenticated user
  const authenticatedUser = req.authenticatedUser;

  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  try {
    let orders

    // check for query parameters
    const { price, date } = req.query

    if (price) {
      const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
      if (value) orders = await orderModel.find({}).sort({ total_price: value })
    } else if (date) {
      const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
      console.log(value, '<-- value')
      if (value) orders = await orderModel.find({}).sort({ created_at: value })
    } 
    if (!orders) orders = await orderModel.find({})

    return res.json({ status: true, orders, requ: req.query })
  } catch (err) {
    next(err)
  }
})

/**
 * Get order by id
 */
router.get('/:orderId', authenticate, async (req, res, next) => {
  // check for authenticated user
  const authenticatedUser = req.authenticatedUser;

  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  const { orderId } = req.params
  try {
    const order = await orderModel.findById(orderId)
    if (!order) {
      return res.status(404).json({ status: false, order: null })
    }
    return res.json({ status: true, order })
  } catch (err) {
    next(err)
  }
})

/**
 * Create a new order
 */
router.post('/', authenticate, async (req, res) => {
  // check for authenticated user
  const authenticatedUser = req.authenticatedUser;

  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  const body = req.body

  const total_price = body.items.reduce((prev, curr) => {
    return (prev += curr.quantity * curr.price)
  }, 0)

  const orderObject = {
    items: body.items,
    created_at: new Date(),
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
 * Update order state
 */
router.patch('/:id', authenticate, async (req, res, next) => {
  // check for authenticated user
  const authenticatedUser = req.authenticatedUser;

  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  if(authenticatedUser.role !== 'admin') {
    return res.status(401).send({message: 'Unauthorised'});
  }

  const { id } = req.params
  const { state } = req.body

  try {
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
  } catch (err) {
    next(err)
  }
})

/**
 * Delete order
 */
router.delete('/:id', authenticate, async (req, res, next) => {
  // check for authenticated user
  const authenticatedUser = req.authenticatedUser;

  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  if(authenticatedUser.role !== 'admin') {
    return res.status(401).send({message: 'Unauthorised'});
  }  
  
  const { id } = req.params
  try {
    const order = await orderModel.findOne({ _id: id })
    const deleted = await order.remove()
    if (deleted) {
      return res.status(204).json({ status: true })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
