const express = require('express');
// const moment = require('moment');
const mongoose = require('mongoose');
const orderRouter = require('./Routes/orderRoutes');
const userRouter = require('./Routes/userRoutes')

require("dotenv").config();
const PORT = 3334 || process.env.PORT;

const app = express()

app.use(express.json());

app.use('/orders', orderRouter);
app.use('/users', userRouter)




mongoose.connect('mongodb://localhost:27017/pizzaapi')

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

