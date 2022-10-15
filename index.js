const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');

const PORT = 3334
// ---------- Import Modules ----------
const { connectToMongoDB } = require("./db/db")
const orderRouter = require("./route/orderRoute")
const userRoute = require('./route/userRoute')

require('./handlers/authentication')


const app = express()

app.use(express.json());
app.use(passport.initialize());


app.use(express.static(__dirname + '/public'))

// ----------- Connecting to MongoDB instance ----------
connectToMongoDB()

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/public/404.html')})

    // ------------ Use API Routes -----------------
app.use('/pizza', passport.authenticate('jwt', { session: false }) ,  orderRouter)
app.use('/user', userRoute)




app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})