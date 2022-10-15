const express = require('express');
// const {connectToMongoDB} =require('./db')
require("dotenv").config();
const OrderRoute = require("./order/ordersroute");
const mongoose = require('mongoose');



const PORT = process.env.PORT;

const app = express()
// connectToMongoDB()

 app.use(express.json());
app.use("/order", OrderRoute);



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