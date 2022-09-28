const express = require('express');
const connectToMongoDb = require('./db');
const userModel = require('./models/userModel');
const orderRouter = require('./routes/order');
const usersRouter = require('./routes/usersRoute');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	return res.json({ status: true });
});
app.use('/users', usersRouter);
app.use((req, res, next) => {
	const { headers } = req;
	if (!headers.username || !headers.password) {
		next(new Error('No username or password'));
	} else {
		userModel
			.findOne({
				username: headers.username,
				password: headers.password,
			})
			.then((out) => {
				req.authorized = true;
				if (!out) next(new Error('Incorrect username or password'));
				next();
			})
			.catch(() => {
				next(new Error('An error occured'));
			});
	}
});
app.use('/orders', orderRouter);

app.use((error, req, res, next) => {
	res.status(500).json({ error: error.message });
});

connectToMongoDb();

app.listen(PORT, () => {
	console.log('Listening on port, ', PORT);
});
