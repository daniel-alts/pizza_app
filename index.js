const express = require('express');
const moment = require('moment');
const userRouter = require('./router/userRouter')
const orderRouter = require('./router/orderRouter')
const { connectToDatabase } = require("./config/db")
require("dotenv").config()

const PORT = process.env.PORT

const app = express()

app.use(express.json());

connectToDatabase()

app.use("/users", userRouter)
app.use('/orders', orderRouter)


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})