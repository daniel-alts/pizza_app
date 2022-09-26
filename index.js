require("dotenv").config() // load .env variables
const express = require('express');
const database = require("./database");
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');
const userModel = require('./models/userModel');
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const UserRouter = require("./controllers/User")
const OrderRouter = require("./controllers/Order") // import Todo Routes
// const bodyParser = require('body-parser');
const {isLoggedIn} = require("./controllers/middleware");
const User = require("./models/userModel");
// const { rawListeners } = require("./models/userModel");

database.connectToMongoDB();

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 5000} = process.env;

// def app
const app = express()


// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.static('public'));
app.use(express.json()) // parse json bodies

// Routes
// done
app.get('/home', (req, res) => {
    res.send("this is the test route to make sure server is working")
})

// done
app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
// app.use("/order", OrderRouter) // send all "/orders" requests to OrderRouter for routing

// done
app.get('/users', async (req, res) => {
    const users = await userModel.find()

    return res.json({ status: true, users })
})

// done
app.post('/order', async (req, res) => {
    // returns the new order
    const body = req.body;

    // reduce is used to sum the price of all items 
    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev

    }, 0);

    // async request
    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
})


// done
app.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

// done
app.get('/orders', async (req, res) => {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
})


// done
app.patch('/order/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
})

// done
app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;
    
    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))

// express body-parser is express.json