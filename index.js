const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
// const orderModel = require('./model/order');
require('dotenv').config()
const PORT = process.env.PORT

const { connectToMongoDB } = require('./db')
const orderRoute = require('./route/order')
const userRoute = require('./route/user')
const userController = require('./Controllers/userController')

const app = express()

//connecting to db
connectToMongoDB()

app.use(express.json());
app.use("/api/auth", userController)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)


app.get("/", (req, res)=>{
    res.send("Welcome Home!")
})

app.listen(PORT || 5252, () => {
    console.log('Listening on port, ', PORT)
})