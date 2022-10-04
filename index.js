const express = require('express');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

require('dotenv').config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use('/orders', ordersRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.status(200).send("Welcome to AltSchool Pizza Place \n Please use the Orders route to make your orders")
})

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})

module.exports = app