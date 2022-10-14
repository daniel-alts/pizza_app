require('dotenv').config()
const express = require('express')
const ordersRoute = require('./routes/orders')
const usersRoute = require('./routes/users')
const loginRoute = require('./controllers/login')
const errorHandler = require('./middleware/errHandler')
const connectDb = require('./middleware/db')
const passport = require('passport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Use passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/login', loginRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/users', usersRoute)

app.all('/', (req, res) => {
  return res.json({ status: true })
})

app.use(errorHandler)

/**
 * Connect to database
 */
connectDb()

/**
 * Start server
 */
const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
