require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const PORT = process.env.PORT || 3334;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/orders', orderRoutes());
app.use('/api/users', userRoutes());

app.get('/', (req, res) => {
  return res.json({ status: true });
});

mongoose.connect(MONGO_URL);

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

module.exports = app;
