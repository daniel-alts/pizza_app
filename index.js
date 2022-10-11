const express = require('express');
const mongoose = require('mongoose');
const orderRoute = require("./routes/order")
const userRoute = require("./routes/User")
const passport = require("passport")
require("dotenv").config()
require("./Auth")
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/order",passport.authenticate("jwt",{session: false}) ,orderRoute)
app.use("/user", userRoute)


app.get('/', (req, res) => {
    return res.json({ status: true })
})

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app