const express = require('express');
const mongoose = require('mongoose');
const orderRouter = require('./routes/orderRoute');
const userRouter = require('./routes/userRoute');

const PORT = 3334;

const app = express();

app.use(express.json());

app.use('/orders', orderRouter);
app.use('/users', userRouter);

mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Successfully');
});

mongoose.connection.on('error', (err) => {
  console.log('An error occurred while connecting to MongoDB');
  console.log(err);
});

app.listen(PORT, () => {
  console.log('Listening on port, ', PORT);
});
