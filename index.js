const express = require('express');
const mongoose = require('mongoose');
const orderRoute = require('./routes/orderRoutes')
const userRoute =  require('./routes/userRoutes')
const dotenv = require('dotenv')


//INTITIALIZING ENVIRONMENT VARIABLES
dotenv.config({ path: './config.env'})


const PORT = 5000
const app = express()


//MIDDLEWARES
app.use(express.json());
app.use((req,res, next) => {
	res.setHeader("Content-Type", "application/json");
	next()
})


// ROUTING
app.use('/order', orderRoute)
app.use("/user", userRoute);



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

module.exports = app