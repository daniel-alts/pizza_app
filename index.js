const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRoute = require('../pizza_app/route/user_route')
const orderRoute = require ('../pizza_app/route/order_route')
const passport = require('passport')

require("../pizza_app/authentication/auth")

require('dotenv').config()
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT


const app = express()

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userRoute);
app.use('/orders', passport.authenticate('jwt', { session: false }), orderRoute);



app.get('/', (req, res) => {
    return res.json({ status: true })
})



mongoose.connect("mongodb+srv://Isaacadun:Isaakadun@cluster0.ki7ilh4.mongodb.net/Pizza_App?retryWrites=true&w=majority")

// console.log(CONNECTION_URL)

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