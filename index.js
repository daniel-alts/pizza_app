const express = require('express');
const passport = require('passport');
const orderRouter = require('./routes/orderRoutes');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRoutes');


require('./db/database')();
require('dotenv').config();

require('./utilities/passport-jwt');

const PORT = process.env.PORT || 3334;

const app = express()

app.set('view-engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/', authRouter);

app.use(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  orderRouter
);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/login', (req, res) => {
  res.render('Login.ejs');
});

app.get('/signup', (req, res) => {
  res.render('Signup.ejs');
});

app.listen(PORT, () => {
  console.log('Listening on port, ', PORT);
});

module.exports = app;