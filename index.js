const express = require('express');
// const moment = require('moment');

const dbConnected = require('./db')

const orderRouter = require('./router/orderRouter')
const userRouter = require('./router/userRoute')

require('./auth/auth')

const PORT = 3334
const app = express()

app.use(express.json());
app.use('/orders', orderRouter)
app.use('/', userRouter)

app.get('/', (req, res) => {
    return res.json({ status: true })
})

// handle error
app.use((err,req,res,next) => {
    res.status(err.status)
    res.json({
        error: err
    })
})

// app.post('/signup', passport.authenticate('signup'))

dbConnected()
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})