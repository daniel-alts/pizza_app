const express = require('express')
const { urlencoded } = require('body-parser')
const morgan = require('morgan')
const orderRouter = require('./resources/order/order.router')
const { protectRoute, signUp } = require('./utils/auth')
const connectDB = require('./utils/database')

const PORT = 3334

connectDB()

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', protectRoute)

app.post('/signup', signUp)
app.use('/api/order', orderRouter)

app.listen(PORT, () => {
  console.log(
    'Listening on port, ',
    PORT
  )
})

module.exports = app