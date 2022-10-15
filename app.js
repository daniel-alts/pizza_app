const express = require('express');
const orderRouter = require('./routes/orderRoute')
const authRouter = require('./routes/auth')
const passport = require('passport');
const bodyParser = require('body-parser');
require('./utils/passport_setup')

const app = express()

//intialize passport
app.use(passport.initialize());


//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use('/', authRouter);
app.use('/orders', passport.authenticate('jwt', { session: false }), orderRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my pizza_App Homepage!!!')
})


module.exports = app;