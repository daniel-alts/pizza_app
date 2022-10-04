const express = require('express');
require('dotenv').config()

const {connectToMongoDB} = require('./controller/db')


const PORT = process.env.PORT
const app = express()

//Connect to DB
connectToMongoDB()

const orderRoute = require('./routes/orders')
const userRoute = require('./routes/user')

app.use(express.json());

app.use('/order', orderRoute)
app.use('/user', userRoute)

app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})