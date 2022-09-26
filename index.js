const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('./model/orderModel');
const orderRouters = require("./routers/orderRoute")
const userRouter = require("./routers/userRouters")
const authtenticateUser = require("./middleware/auth")
const ordersRouters = require('./routers/ordersRoute')

const PORT = 3334

const app = express()

app.use(express.json());

app.use("/user",userRouter)

app.use("/order",authtenticateUser,orderRouters)

app.use("/orders",ordersRouters)






app.get('/', (req, res) => {
    return res.json({ status: true })
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