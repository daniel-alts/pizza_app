const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('./models/order');

const orderRouter = require("./routes/order")
const userRouter = require("./routes/user")

const authenticate = require("./auth")
const { connectDB } = require("./db")

const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

// Handle order routes
app.use("/order", (req, res, next) => {
    // Make sure user is authenticated
    const user = req.body.user
    authenticate(user).then(next()).catch(
        err => res.status(401).end(err)
    )

}, orderRouter)

// Handle user routes
app.use("/user", userRouter)

app.get((req, res) => {
    res.status(404).json({error: "Route not found"})
})

// Connect to mongo atlas instance
connectDB()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})