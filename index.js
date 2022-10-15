const express = require('express');
const passport = require('passport')
require('dotenv').config()

//routes

const authRoute = require('./routes/auth');
const orderRoute = require('./routes/orders')
const userRoute = require('./routes/user')


require('./auth/auth')

const { connectToMongoDB } = require('./controllers/db')


const PORT = process.env.PORT
const app = express()

//Connect to DB
connectToMongoDB()



app.use(express.json());
app.use(passport.initialize())

app.use('/orders', passport.authenticate('jwt', { session: false }), orderRoute)
app.use('/user', userRoute)


app.get('/', (req, res) => {
    return res.json({ status: true })
})



app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})