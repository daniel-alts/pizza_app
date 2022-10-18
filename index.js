const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodypaser = require("body-parser");
const orderRoute = require('./Route/OrderRoute');
const userRoute = require('./Route/UserRoute')
require("dotenv").config
const PORT = 3334
require("./auth")
const app = express()
app.use(bodypaser.urlencoded({ extended: false}))
app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('/', userRoute);
app.use('/order', passport.authenticate('jwt', { session: false }), orderRoute);


mongoose.connect('mongodb://localhost:27017/pizza_app')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while conn   ecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})