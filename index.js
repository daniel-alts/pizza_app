require('dotenv').config()
const express = require('express');
const passport = require('passport')

const app = express()

app.use(express.json())

const userRouter = require('./Users/routes')
const orderRouter = require('./Orders/routes')

const authMiddleware = require('./Middleware/authentication')

app.use(express.json());

app.use('/users', userRouter)
app.use('/', passport.authenticate('jwt', { session: false }), orderRouter)

app.use(function(err, req, res, next ){
    console.log(err)
    res.status(err.status || 500)
    res.json({ error: err.message })
})

module.exports = app