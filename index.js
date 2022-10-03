const express = require('express');
const moment = require('moment');
require('dotenv').config()
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/user_routes')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('/orders', orderRoutes)
app.use('/users', userRoutes)

mongoose.connect(process.env.MONGO_URI)

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