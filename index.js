const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');
const OrderRoute = require("./routes/orderRoutes");
const UserRoute = require("./routes/userRoutes")
const OrderController = require("./controllers/orderController")
const UserController = require("./controllers/userController")
const authenticateUser = require('./middleware/auth')

const PORT = 3334

const app = express()

app.use(express.json());

app.use("/order", OrderRoute)
app.use("/", UserRoute)
// app.use(authenticateUser)

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