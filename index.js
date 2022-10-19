const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const passport = require("passport")
const orderModel = require('./models/orderModel');
const orderRoute = require('./routes/orderRoute')
const userModel = require("./models/userModel")
const userRoute = require("./routes/userRoute")
const authRouter = require("./routes/authRoute")

const PORT = 3334
require("./authentication/auth")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRouter);
app.use("/order", passport.authenticate('jwt', { session: false }), orderRoute)


//render homepage
app.get('/', (req, res) => {
    return res.json({ status: true, message:"Welcome to our Pizza App" })
})

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

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