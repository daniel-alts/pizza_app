const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');

require("./db").connectToMongoDB()
require('dotenv').config()

const PORT = 3334

const app = express()

app.use(express.json());

app.use("/order", require("./Routes/orderRouter"))
app.use("/user", require("./Routes/newUserRoute"))


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
})