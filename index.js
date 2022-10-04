const express = require('express');
const mongoose = require('mongoose');
const orderRoute = require("./routes/order")
const userRoute = require("./routes/users")

const PORT = 3334
const app = express()

app.use(express.json());
app.use("/order", orderRoute);
app.use("/user", userRoute);


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