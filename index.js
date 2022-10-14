const express = require('express');
require('dotenv').config();
const moment = require('moment');
const mongoose = require('mongoose');
var passport = require('passport')
var session = require("express-session")

const authenticate = require('./authenticate')
const orderRoute = require('./routes/orderRoute')
const userRoute = require('./routes/userRoute')
const config = require('./config')

const PORT = config.port

mongoose.connect(config.mongoUrl)

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

const app = express()

app.use(express.json());

app.use(session({
	name: "session-id",
	secret: config.secretKey,
	saveUninitialized: false,
	resave: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.use('/orders', orderRoute)
app.use('/users', userRoute)


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app;