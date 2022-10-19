const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const orderRoute = require('./route/order_route');
const userRoute = require('./route/user_route')



require('./db').connectToMongoDB() 
require('dotenv').config()

require("./authentication/auth") //signup and login middlewear

const PORT = 3334

const app = express()

app.use(express.json());



app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoute)
app.use('/orders', orderRoute)
app.use('/user', passport.authenticate('jwt', { session: false }), orderRoute);


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use(function (err, req, res, next) {
      console.log(err);
        res.status(err.status || 500);
        res.json({ error: err.message });
    });

mongoose.connect('mongodb://localhost:27017');
mongoose.connection.on("connected", () => {
 	//console.log("Connected to MongoDB Successfully");
});


mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port,', PORT)
 })