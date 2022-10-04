const express = require('express');
require('dotenv').config();
const moment = require('moment');
const mongoose = require('mongoose');
const authenticate = require('./authenticate')
const orderRoute = require('./routes/orderRoute')


const PORT = process.env.PORT

mongoose.connect(process.env.DB_URL)

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.use('/orders', orderRoute)


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app;