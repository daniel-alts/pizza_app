const express = require('express');
const orderRouter = require('./routes/orderRoute')
const userRouter = require('./routes/userRoute')


const app = express()

//middleware
app.use(express.json());
app.use('/orders', orderRouter);
app.use('/users', userRouter);


app.get('/', (req, res) => {
    res.send('Welcome to my pizza_App Homepage!!!')
})


module.exports = app;