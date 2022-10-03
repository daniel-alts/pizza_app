const express = require('express');
require('dotenv').config();

const orderRouter = require('./routes/orderRoutes');
const usersRoute = require('./routes/usersRoutes');
const registerRoute = require('./routes/registerRoutes');
const loginRouter = require('./routes/loginRoute');

const { connectTMongoDB } = require('./model');

const app = express();
app.use(express.json());

app.use('/orders', orderRouter);
app.use('/register', registerRoute);
app.use('/users', usersRoute);
app.use('/login', loginRouter);

const PORT = process.env.PORT;
connectTMongoDB();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  // console.log(`listening at PORT ${PORT}`);
});

module.exports = {app, orderRouter, usersRoute, loginRouter, registerRoute};
