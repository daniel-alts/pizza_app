const express = require('express');

const {connectToMongo} = require('./database')
const UserRouter = require('./Routes/UserRoute')
const OrderRouter = require('./Routes/OrderRoute')
const bodyParser = require('body-parser');
const passport = require('passport')
const OrderPg = require('./Routes/OrderPg')

require('dotenv').config();
require('./Authentication/authentication')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.json());

// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.use("/order", passport.authenticate('jwt', { session: false }), OrderRouter);
app.use("/", UserRouter);
app.use('/orders', OrderPg);


app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({error: err.message});
})

module.exports = app
