const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderRouter = require('./routes/orderroute');
const userRouter = require('./routes/userroute');


const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('/orders',orderRouter);
app.use('/user',userRouter);


mongoose.connect('mongodb+srv://omotega:pulisic22@cluster0.7jjoo.mongodb.net/?retryWrites=true&w=majority');

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