require('dotenv').config()
const express = require('express');


const app = express()

const userRouter = require('./Users/routes')
const orderRouter = require('./Orders/routes')

const authMiddleware = require('./Middleware/authentication')

app.use(express.json());

app.use('/users', userRouter)
app.use('/', authMiddleware, orderRouter)

module.exports = app