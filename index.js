const express = require('express');
const app = express()

// ---------- Modules ----------
const bodyParser = require('body-parser');
const passport = require('passport');
require("dotenv").config()
const Sentry = require('@sentry/node');
const SENTRY_DSN = process.env.SENTRY_DSN

// ---------- Import Modules ----------
const { connectToMongoDb } = require("./db/db")
const orderRouter = require("./routes/order")
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
require("./authentication/auth")
const fileUploadRouter = require('./routes/fileUploadRoute')

// ---------- Sentry Config ----------
Sentry.init({ dsn: SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());

// ----------- Connecting to MongoDB instance ----------
connectToMongoDb()

// ---------- Middleware ----------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))


// ------------ Use API Routes -----------------
app.use('/', authRouter)
app.use('/pizza', passport.authenticate('jwt', { session: false }), orderRouter)
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter)
app.use('/file', fileUploadRouter);

// API Home Route
app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/public/index')
})


// --------- Sentry Error Handler ------------
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// ------------- Error Handler -------------
// app.use(function (err, req, res, next) {
//     console.log(err);
//     res.status(err.status || 500);
//     res.json({ error: err.message });
// });


// ---------- Server Config -----------
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})


module.exports = app