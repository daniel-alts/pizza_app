const express = require('express');
const moment = require('moment');
const routes = require("./routes/index")
const mongoose = require('mongoose');

const PORT = 8000

const app = express()

app.use(express.json());
app.use(routes)

app.post("/", (req, res) =>{
	res.send("heyyy")
})


mongoose.connect('mongodb+srv://peltastic:3123pex3123@cluster1.db16ass.mongodb.net/bookstore?retryWrites=true&w=majority')

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

module.exports = app