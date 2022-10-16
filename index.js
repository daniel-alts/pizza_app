const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');
const UserRoute = require("./Routes/UserRoutes")
const authenticate = require("./authenticate")
const OrderRoute = require("./Routes/OrderRoutes")

const PORT = 3334

const app = express()

app.use(express.json());


app.use("/user", UserRoute);
app.use("/order", OrderRoute);


app.get('/', (req, res) => {
    authenticate(req,res)
        .then(() => {
            return res.json({ status: true })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })
})


app.get('/orders', (req, res) => {
    authenticate(req,res)
        .then(async() => {
            const {total_price, order, created_at} = req.query;
            let totNum;
            let orderNum;
            let creNum;
            let page = 1;
            let maxi = 2;
            total_price === "asc" ? totNum = 1 : totNum = -1;
            order === "asc" ? orderNum = 1 : orderNum = -1;
            created_at === "asc" ? creNum = 1 : creNum = -1;

            const orders = await orderModel.find().sort({total_price: totNum, order: orderNum, created_at: creNum }).skip((page - 1) * maxi).limit(maxi)

            return res.json({ status: true, orders })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })
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