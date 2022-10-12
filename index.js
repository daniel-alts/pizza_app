const express = require('express');
const morgan = require('morgan');
const connectToMongoDB = require('./config/dbConfig');
const authRouter = require('./routes/auth.route');
const orderRouter = require('./routes/order.route');
const userRouter = require('./routes/users.route');

const PORT = 8000;

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Connect to MongoDB database
connectToMongoDB();

// Routes
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  // console.log('Server listening on port, ', PORT);
});
