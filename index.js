const express = require('express');
require('dotenv').config()
const orderRouter = require('./routes/ordersRoutes')
const usersRouter = require('./routes/usersRoutes')
const connectToDB = require('./connectMongoDB');
const passport = require('passport');

const PORT = process.env.PORT

const app = express()
require('./authentication/authJWT')

//Connect to Database
connectToDB()


//Middlewares
app.use(express.json());
app.use('/orders',passport.authenticate('jwt', {session:false}), orderRouter)
app.use('/users', usersRouter)


app.get('/secured', passport.authenticate('jwt', {session: false}), (req, res) => {

    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app