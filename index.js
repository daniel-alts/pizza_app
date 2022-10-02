const express = require('express');
const moment = require('moment');
require('dotenv').config()
const mongoose = require('mongoose');
// const orderModel = require('./orderModel');
const orderRouter = require('./routes/ordersRoutes')
const usersRouter = require('./routes/usersRoutes')
const connectToDB = require('./connectMongoDB')

const PORT = process.env.PORT

const app = express()

//Connect to Database
connectToDB()


//Middlewares
app.use(express.json());
app.use('/orders', orderRouter)
app.use('/users', usersRouter)


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app