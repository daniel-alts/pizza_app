const express = require('express');
const {connectToMongoDB} = require('./config/dbConfig');
const orderRouter = require('./routes/order');
const {userRouter} = require('./routes/user');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const passport = require('passport');

connectToMongoDB()
require('dotenv').config()

require('./utils/authenticate')

const PORT = process.env.PORT
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', authRoute)
app.use('/api/order', passport.authenticate('jwt', {session:false}), orderRouter);
app.use('/api/user', passport.authenticate('jwt', {session:false}), userRouter);


app.get('/', (req, res) => {
    return res.status(200).send("Welcome to the pizza store")
});

app.use(function (error, req, res, next) {
    console.log(error);
    res.status(error.status || 500);
    res.json({error: error.message})
})

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
});

