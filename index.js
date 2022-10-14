const express = require('express');
const routes = require("./routes/index")
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

const PORT = 8000

const app = express()

app.use(express.json());
app.use(routes)

app.post("/", (req, res) =>{
	res.send("heyyy")
})


mongoose.connect(process.env.DB_URI)

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