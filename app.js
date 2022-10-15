const express = require('express');
require('dotenv').config();
const authRoute = require('./routes/auth');
const passport = require('passport');

require('./authentication/auth');

const app = express();
app.use(express.json());

const orderRouter = require('./routes/orderRoutes');
const usersRoute = require('./routes/usersRoutes');

app.use('/', authRoute);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRoute);
app.use('/orders', orderRouter);

const { connectTMongoDB } = require('./model');

const PORT = process.env.PORT;
connectTMongoDB();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  // console.log(`listening at PORT ${PORT}`);
});

module.exports = { app, orderRouter, usersRoute };
