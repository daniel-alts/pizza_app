const express = require('express');
const mongoose = require('mongoose');
const modelRouter = require('./Orders/orderController')
const  userRouter = require('./user/userController')

const PORT = 3334

const app = express()

app.use(express.json());
app.use("/user", userRouter)
app.use("/order", modelRouter) 


mongoose.connect('mongodb+srv://Arthur_2002:1234arthur@cluster0.tzk9r.mongodb.net/?retryWrites=true&w=majority')

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