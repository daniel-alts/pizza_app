const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const {orderRouter} = require('./Router/orderRouter')
const {userRouter} = require('./Router/userRouter')

const PORT = 3334

const app = express()

require("dotenv").config();

app.use(express.json());

// app.get('/', (req, res) => {
//     return res.json({ status: true })
// })


app.use("/order", orderRouter);
app.use("/users", userRouter);



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