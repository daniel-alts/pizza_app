const express = require('express');
const moment = require('moment');
const passport = require('passport')

const orderModel = require('./models/orderModel');
const orderRouter = require('./routes/orderRoutes')
const authRouter = require('./routes/authRoutes')
// const basicAuth = require('./middleware/basicAuth')

require('./db').connectToMongoDB() // Connect to MongoDB

require('./passport')

const PORT = 3334


const app = express()

app.use(express.json());
// app.use(basicAuth)


app.use("/orders", passport.authenticate('jwt', { session: false }), orderRouter)
app.use("/", authRouter)


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('*', (req, res) => {
    return res.json({ status: true})
})



app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})