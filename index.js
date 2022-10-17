const express = require('express');
const moment = require('moment');
const passport = require('passport');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const orderModel = require('./Models/orderModel');
require('dotenv').config();
require("./Authentication/authentication");

const OrderRoute = require("./Routes/OrderRoutes");

const AuthRoute = require("./Routes/AuthRoute")

const PORT = 3334

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());


app.use("/", AuthRoute);
app.use("/order", passport.authenticate('jwt', { session: false }), OrderRoute);


app.get('/', (req, res) => {
    res.send("Login or signup to make an order")
})


mongoose.connect('mongodb://localhost:27017')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app;