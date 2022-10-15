const express = require('express');
const dotenv = require('dotenv');

const mongoose = require('mongoose');

const oderRoute = require('./orderRoute')
const userRoute = require('./userRoute');
const  auth  = require('./authenticate');

dotenv.config({ path: './.env'})
const app = express()

app.use(express.json());

const PORT = 3334


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('/orders', auth.authorize, oderRoute)
app.use('/user', userRoute)

mongoose.connect(process.env.DATABASE)
 
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