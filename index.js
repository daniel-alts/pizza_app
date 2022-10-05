const express = require('express');
const {connectToMongoDB} = require('./db');
const ordersRoute = require('./routes/orders');
const userRoute = require('./routes/users');

require("dotenv").config()
const PORT = process.env.PORT;

const app = express()

// Connect to MongoDB
connectToMongoDB();


app.use(express.json());

app.use('/orders', ordersRoute);
app.use('/users', userRoute);


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})