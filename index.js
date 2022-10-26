const express = require('express');
const passport = require('passport');
const OrderRouter = require('./routes/OrderRoutes');
const AuthRouter = require('./routes/AuthRoutes');

const app = express()

// register passport
require("./passport") 

// middleware
app.use(express.json());
// app.use(BasicAuth)

// routes
app.use('/orders', passport.authenticate('jwt', { session: false  }), OrderRouter)
app.use('/',  AuthRouter)

// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})

module.exports = app;
