const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const OrderRoute = require("./Routes/OrderRoute")
const UserRoute = require("./Routes/UserRoute")
const authenticate = require("./auth")
require("dotenv").config()

const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

// Routes
app.use("/", authenticate, OrderRoute)
app.use("/user", UserRoute)

mongoose.connect(process.env.MONGO_URI)

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
