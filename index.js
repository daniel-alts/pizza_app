const express = require('express');
const moment = require('moment');
const db = require('./db')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const passport = require('passport')
const PORT = 3334

const app = express()

// app.use(express.json());

// CONNECT TO MONGOOSE
db.connectToDb()

//Signup and login authentication middleware
require('./authentication/auth')

//To parse url encoded data 
app.use(bodyParser.urlencoded( {extended: false} ))

// USER ROUTE
app.use('/user', userRouter)

// ORDER ROUTE
app.use('/order', passport.authenticate('jwt', {session: false}), orderRouter)

app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app