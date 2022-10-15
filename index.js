const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const connectToMongoDB = require('./config/dbConfig');
const authRouter = require('./routes/auth.route');
const orderRouter = require('./routes/order.route');
const userRouter = require('./routes/users.route');
const authorise = require('./middlewares/authorise');
require('./middlewares/auth');

const PORT = 8000;

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));

// Connect to MongoDB database
connectToMongoDB();

// Routes
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), authorise(['admin']), userRouter);

// Handle errors.
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
  next();
});

app.listen(PORT, () => {
  console.log('Server listening on port, ', PORT);
});
