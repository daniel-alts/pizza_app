const express = require('express');

const { DBconnection } = require('./db')

const orderRoute = require('./routes/orderRoute')
const userRoute = require('./routes/userRoute')


const PORT = 3334

const app = express()

app.use(express.json());

DBconnection()


app.get('/', (req, res) => {
    return res.json({ status: true })
})
app.use('/user', userRoute)
app.use('/order', orderRoute)


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})