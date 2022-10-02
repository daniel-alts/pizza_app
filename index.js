const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//importing routers
const orderRouter = require('./routes/orders');
const userRouter = require('./routes/users');

//import authentication middleware
const authentication = require('./middleware/authentication');
dotenv.config();
const PORT = 5000;

const app = express();

app.use(express.json());

// using the routers
app.use('/register', userRouter);
app.use('/orders', authentication, orderRouter);

app.all('*', (req, res) => {
  return res.status(404).json({ status: false, msg: 'page not Found' });
});

mongoose
  .connect(process.env.mongodb)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

module.exports = app;
