const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/user.route');
const orderRouter = require('./src/routes/order.route');
const { login, register } = require('./src/services/auth.service')
require('dotenv').config()
const PORT = 3334

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.use('/orders',  orderRouter);
app.use('/users',userRouter);

app.post('/login', login)
app.post('/register', register)

mongoose.connect( process.env.MONGO_URI ,{useNewUrlParser : true})
.then(()=>{console.log("Connected to MongoDB Successfully")})
.catch(()=>{console.log("An error occurred while connecting to MongoDB")})

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})