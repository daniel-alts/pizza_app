const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const OrderRoute = require('pizza_app\routes\order.js') 
const userRoute = require('pizza_app\routes\User.js')

// refactored the main index.js file

require('./db').connectToMongoDB() // Connect to MongoDB
require('dotenv').config()

require("./authentication/authenticate") // Signup and login authentication middleware

const PORT = 3000;
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userRoute);
app.use('/Order', passport.authenticate('jwt', { session: false }), OrderRoute);

// renders the home page
app.get('/', (req, res) => {
    res.send('Welcome to the Pizza Order API');
});

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
