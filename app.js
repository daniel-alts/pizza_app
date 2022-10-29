// ************IMPORT ALL DEPENDENCIES AND CREATE APP ************/
const express = require('express');
require('./db')
const passport = require('passport')

const orderRouter = require('./routers/orderRoutes');
const authentication = require('./controllers/user');
// const userRouter = require('./routers/users');
const userAuth = require('./routers/users')
require('dotenv').config()
require('./authentication/userAuth')
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json({type: 'application/json'}));

app.use('/', userAuth)
app.use('/api/orders', passport.authenticate('jwt', {session:false}),orderRouter )
// app.use('/api/orders', authentication.authenticateUser, orderRouter)

// app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        success: false,
        msg: err.message
    })
})

module.exports = app;