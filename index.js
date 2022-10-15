const express = require('express');
const moment = require('moment');
const passport = require('passport');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/user.route');
const orderRouter = require('./src/routes/order.route');
const authRouter = require('./src/routes/auth.route');
const { userauth } = require('./src/controllers/auth.controller')
require('dotenv').config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.use('/orders', orderRouter);
app.use('/users',userRouter);
app.use('/auth', authRouter)

mongoose.connect( process.env.MONGO_URI ,{useNewUrlParser : true})
.then(()=>{console.log("Connected to MongoDB Successfully")})
.catch(()=>{console.log("An error occurred while connecting to MongoDB")})

app.listen(process.env.PORT, () => {
    console.log('Listening on port, ', process.env.PORT)
})