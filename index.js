const express = require('express');
const mongoose = require('mongoose');
const userRoute = require("./Routers/userRoute");
const orderRoute = require('./Routers/orderRoute')
const ordersRoute = require('./Routers/ordersRoute')


const PORT = 3334

const app = express()

app.use(express.json());

app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/orders", ordersRoute)



app.get('/', (req, res) => {
    return res.json({ status: true })
})




app.get('/orders', async (req, res) => {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
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