const express = require('express');
const passport = require('passport');
const connectToMongoDb = require('./db');
const userModel = require('./models/userModel');
const authRoute = require('./routes/authRoute');
const orderRouter = require('./routes/order');
const usersRouter = require('./routes/usersRoute');
require('dotenv').config();

require('./authentication/auth');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	return res.json({ status: true });
});
app.use('/auth', authRoute);

// app.use('/users', usersRouter);
app.use('/orders', passport.authenticate('jwt', { session: false }), orderRouter);

app.use((error, req, res, next) => {
	res.status(500).json({ error: error.message });
});

connectToMongoDb();

app.listen(PORT, () => {
	console.log('Listening on port, ', PORT);
});
