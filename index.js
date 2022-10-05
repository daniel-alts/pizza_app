const express = require('express')
const moment = require('moment')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const orderModel = require('./orderModel')
const User = require('./userModel')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())

// User Authentication
app.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      user_type: req.body.user_type,
    })
    res.status(200).json({
      status: 'success',
      data: {
        newUser,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: `User encountered ${err}`,
    })
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const token = 'Authenticated'
    const cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    //1. Grab username from request body.
    const { username, password } = req.body
    //2. check if username exists in database
    const currentUser = await User.findOne({ username })
    //3. encrypt provided password and check if it exists
    if (
      !currentUser ||
      !(await currentUser.correctPassword(password, currentUser.password))
    ) {
      next(err)
    }
    res.cookie('token', token, cookieOptions)
    res.status(201).json({
      status: 'Success',
      message: 'Login Successful',
    })
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: `Incorrect Password or Username`,
    })
  }
})

app.get('/', (req, res) => {
  return res.json({ status: true })
})

const protectRoute = async (req, res, next) => {
  const token = req.cookies.token
  try {
    if (token == 'Authenticated') {
      return next()
    }
    return next(err)
  } catch (err) {
    res.status(403).json({
      status: 'Failed',
      message: `Please Login`,
    })
  }
}
app.post('/order', protectRoute, async (req, res) => {
  console.log(req.cookies.token)
  const body = req.body

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price
    return prev
  }, 0)

  const order = await orderModel.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
    state: req.body.state,
  })

  return res.json({ status: true, order })
})

// app.get('/order/:sort', async (req, res, next) => {
//   const queryObj = { ...req.query }
//   const excludedFields = ['page', 'sort', 'limit', 'fields']
//   excludedFields.forEach((el) => delete queryObj[el])

//   const { sort } = req.params

//   let query = orderModel.find(queryObj)
//   if (sort) {
//     query = query.sort(sort)
//   }
//   const order = await query

//   res.status(200).json({
//     status: 'Success',
//     result: order.length,
//     data: {
//       order,
//     },
//   })
// })

app.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params
  const order = await orderModel.findById(orderId)
  console.log(req.params)
  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  return res.json({ status: true, order })
})

app.get('/orders/:sort?', async (req, res) => {
  const queryObj = { ...req.query }
  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach((el) => delete queryObj[el])

  const { sort } = req.params

  let query = orderModel.find(queryObj)
  if (sort) {
    query = query.sort(sort)
  }
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 5
  const skip = (page - 1) * limit

  query = query.skip(skip).limit(limit)
  const orders = await query

  return res.json({
    status: true,
    results: orders.length,
    orders,
  })
})

app.patch('/order/:id', async (req, res) => {
  const { id } = req.params
  const { state } = req.body

  const order = await orderModel.findById(id)

  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: 'Invalid operation' })
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

mongoose.connect(process.env.DATABASE_LOCAL)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Successfully')
})

mongoose.connection.on('error', (err) => {
  console.log('An error occurred while connecting to MongoDB')
  console.log(err)
})

app.listen(PORT, () => {
  console.log('Listening on port, ', PORT)
})

console.log(process.env.NODE_ENV)
