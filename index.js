const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const {orderRouter} = require('./Router/orderRouter')
const {userRouter} = require('./Router/userRouter')
const app = express()
require("dotenv").config();
const PORT = 3334
app.use(express.json());
app.use("/user", userRouter)
app.use("/order", orderRouter) 


mongoose.connect('mongodb+srv://Arthur_2002:1234arthur@cluster0.tzk9r.mongodb.net/?retryWrites=true&w=majority')

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