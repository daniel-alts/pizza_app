const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderRouter = require('./routes/order.route');
const userRouter = require('./routes/user.route');

const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('/user', userRouter)
app.post('/order', orderRouter)


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