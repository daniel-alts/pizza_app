const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('./model/orderModel');
const orderRouters = require("./routers/orderRoute")
const userRouter = require("./routers/userRouters")
const authtenticateUser = require("./middleware/auth")

const PORT = 3334

const app = express()

app.use(express.json());

app.use("/order",authtenticateUser,orderRouters)

app.use("/user",userRouter)



app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.get('/orders', async (req, res) => {

    const { page, limit } = req.query;

    const orders = await orderModel.find().sort({"total_price":-1,"created_at":-1}).limit(limit * 1).skip((page - 1) * limit).exec()


    return res.json({ status: true, orders, totalPages: Math.ceil(page / limit),currentPage: page })
})



mongoose.connect('mongodb://localhost:27017')

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

module.exports = app;