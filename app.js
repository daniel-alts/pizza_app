const express = require('express');
const passport = require('passport'); //authentication
const bodyParser = require('body-parser');
const orderRoute = require('./routes/orderRoute');
const authRoute = require('./routes/auth');
const { connectToMongoDB } = require('./db');
require('dotenv').config()
require("./authentication/auth") // Signup and login authentication middleware

const PORT = process.env.PORT

const app = express()

app.use(express.json());

//Connect to MongoDb
connectToMongoDB()


app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', authRoute);
app.use('/orders', passport.authenticate('jwt', { session: false }), orderRoute);

// render the homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Pizza Order API');
})

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log(`Server Started on PORT: http://localhost:${PORT}`)
})