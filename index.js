const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('./models/order');
const orderRouter = require("./routes/order")
const userRouter = require("./routes/user")
const { connectDB } = require("./db")

const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

// Handle order routes
app.use("/order", orderRouter)

// Handle user routes
app.use("/user", userRouter)

app.get(() => {})

// Connect to mongo atlas instance
connectDB()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})