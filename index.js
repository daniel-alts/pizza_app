const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
require('dotenv').config()
const orderModel = require('./Models/orderModel');
const userModel = require('./Models/userModel')

const PORT = process.env.PORT

const app = express()

app.use(express.json());




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