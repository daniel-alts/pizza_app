const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');

const PORT = 8080

const app = express()

app.use(express.json());


app.get('/ping', (req, res) => {
    return res.json({ status: 'success', message: 'Welcome to Pizza App' })
})


app.use("/order", require("./routes/orderRoutes"));
app.use("/user", require("./routes/userRoute"));

// Not found route - 404
app.use("**", (req, res) => {
    res.status(404).send({ message: "Route not found" })
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