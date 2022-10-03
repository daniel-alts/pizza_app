const express = require('express');
const { connectToMongoDB } = require("./config/db.config")
require("dotenv").config();

const PORT = process.env.PORT || 3500;
const app = express()

// import routes
const orderRoute = require('./routes/orders.routes');
const userRoute = require('./routes/users.routes');

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

// handle Book routes
app.use('/order', orderRoute);
app.use('/user', userRoute);


connectToMongoDB();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})