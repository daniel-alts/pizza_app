const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const PORT = process.env.PORT || 3500;

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

// handle Book routes
app.use('/order', bookRoute);

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