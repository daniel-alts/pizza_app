const express = require('express');
const moment = require('moment');
const db = require('./db')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const PORT = 3334

const app = express()

app.use(express.json());

// CONNECT TO MONGOOSE
db.connectToDb()

// USER ROUTE
app.use('/user', userRouter)

// ORDER ROUTE
app.use('/order', orderRouter)

app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app