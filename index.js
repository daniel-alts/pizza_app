const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');



const authRouter = require("./routes/auth")
const orderRoute = require("./routes/order")

require('dotenv').config();
require('./authentication/auth');

const PORT = 3334

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/", authRouter)
app.use("/orders", passport.authenticate('jwt', { session: false }), orderRoute)

app.get('/', (req, res) => {
    return res.json({ status: true })
})


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