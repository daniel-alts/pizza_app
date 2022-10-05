const express = require('express');
const {connectToMongoDB} = require('./DB_Connection/db')

const orderRoute = require('./routes/orderRoutes')
const userRoute = require('./routes/userRoutes')
const authenticatedUser = require('./middleware/authenticate')

require('dotenv').config()

const PORT = process.env.PORT
connectToMongoDB()
const app = express()

app.use(express.json());


app.use('/orders', orderRoute)
app.use('/users', userRoute)

app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})