const express = require('express');
const passport = require('passport');
const OrderRouter = require('./routes/OrderRoutes');
const AuthRouter = require('./routes/AuthRoutes');
const Sentry = require('@sentry/node');

const app = express()

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());

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

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
  console.log(err)
});

module.exports = app;
