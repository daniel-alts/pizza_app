const express = require('express');
const mongoConnect = require('./db_connect/connect');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./model/orderModel');



const PORT = 3334

const app = express();

mongoConnect();

app.use(express.json());
app.use('/orders', orderRoute);
app.use('/users', userRoute);




app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})