require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const ordersRoute = require('./routes/orders')
const usersRoute = require('./routes/users')
const errorHandler = require('./middleware/errHandler')

const app = express()

app.use(express.json())

app.use('/api/orders', ordersRoute)
app.use('/api/users', usersRoute)

app.all('/', (req, res) => {
  return res.json({ status: true })
})

app.use(errorHandler)

/**
 * Connect to database
 */
const URL = process.env.URI
mongoose
  .connect(URL)
  .then(() => {
    console.log(`Connection to MongoDB successful`)
  })
  .catch((err) => {
    console.log(`Connection to MongoDB failed`, err.message)
  })

/**
 * Start server
 */
const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
