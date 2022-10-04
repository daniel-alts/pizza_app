const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');
const OrderRoute = require("./routes/orderRoutes");
const UserRoute = require("./routes/userRoutes");
const OrderControl = require("./controls/orderController");
const UserControl = require("./controls/userController");
const authenticateUser = require("./middleware/auth");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.json());

app.use("/", OrderRoute);
app.use("/", UserRoute);

app.get('/', (req, res) => {
    return res.json({ status: true })
})

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)

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