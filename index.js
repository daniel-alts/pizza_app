const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');

const PORT = 3334
// ---------- Import Modules ----------
const { connectToMongoDB } = require("./db/db")
const orderRouter = require("./route/orderRoute")
const userRouter = require('./route/userRoute')


const app = express()

app.use(express.json());

app.use(express.static(__dirname + '/public'))

// ----------- Connecting to MongoDB instance ----------
connectToMongoDB()


app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/public/index')})

    // ------------ Use API Routes -----------------
app.use('/pizza', orderRouter)
app.use('/user', userRouter)




app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})