const express = require('express');
const passport = require('passport')
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');
const connectDB = require('./database');
require('dotenv').config();
require('./auth');

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/users', usersRoute)
app.use('/orders', passport.authenticate('jwt', {session: false}), ordersRoute)


app.get('/', (req, res) => {
    res.status(200).send("Home route")
})

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})

connectDB();

module.exports = app