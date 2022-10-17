const express = require('express')
const { urlencoded } = require('body-parser')
const morgan = require('morgan')
const orderRouter = require('./resources/order/order.router')
const { protectRoute, signUp, signIn } = require('./utils/auth')
const connectDB = require('./utils/database')
const { errorLogger, errorResponder, invalidPathHandler } = require('./utils/errHandler')

const PORT = 3334

connectDB()

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', protectRoute)


app.post('/signin', signIn)
app.post('/signup', signUp)
app.use('/api/order', orderRouter)


app.all('*', (req, res, next) => {
    console.log('here')
  next()
})

app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

app.listen(PORT, () => {
  console.log(
    'Listening on port, ',
    PORT
  )
})

module.exports = app
