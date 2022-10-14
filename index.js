const express = require('express');
const passport = require("passport")
const bodyParser = require('body-parser');


const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require('./routes/authRoute');

//connecting to database
const database = require('./database');
database.connectingToMongoDB();
require('dotenv').config();

require('./authentication/auth') //signup and login authentication middleware

const PORT = process.env.PORT

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRoute);




app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to pizza app')
})


app.use('/order', passport.authenticate('jwt', { session: false }) , orderRoute);
app.use('/user', userRoute)

//Error Handler
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});




app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});