const mongoConnect = require('./connections/connect')
const express = require('express');
const orderRoute = require('./routes/orderRoute')
const userRoute = require('./routes/userRoute')

const PORT = 3000;
const app = express()

mongoConnect()

app.use(express.json());
app.use('/orders', orderRoute)
app.use('/users', userRoute)

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
