const express = require('express')
const mongoose = require('mongoose')
const { urlencoded } = require('body-parser')
const morgan = require('morgan')
const orderRouter = require('./resources/order/order.router')

const PORT = 3334

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/order', orderRouter)




mongoose.connect('mongodb://0.0.0.0:27017/order')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})