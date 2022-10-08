const express = require('express');
const moment = require('moment');
const { connectMongodb } = require('./config/mongodb');
const authenticateUser = require('./middleware/auth');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
require("dotenv").config()

const PORT = process.env.PORT

const app = express()

app.use(express.json());

app.use("/order", authenticateUser, orderRoute)
app.use("/auth", authRoute)

app.get('/', (req, res) => {
    return res.json({ status: true })
})


connectMongodb()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})