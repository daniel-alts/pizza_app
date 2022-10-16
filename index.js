const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require("dotenv").config()

// ---------- Import Modules ----------
const { connectToMongoDb } = require("./db/db")
const orderRouter = require("./routes/order")
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))

// ----------- Connecting to MongoDB instance ----------
connectToMongoDb()

require("./authentication/auth")

// ------------ Use API Routes -----------------
app.use('/', authRouter)
app.use('/pizza', passport.authenticate('jwt', { session: false }), orderRouter)
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter)

// API Home Route
app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/public/index')
})

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

// Server Config
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app