const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const requireAuth = require('./middlewares/requireAuth');
const orderRouter = require('./routes/order.route');
const userRouter = require('./routes/user.route');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const PORT = 3334

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
	return res.status(200).send('hello world')
})

app.use('/user', userRouter)
app.use('/order', requireAuth, orderRouter)

if (process.env.NODE_ENV !== 'test') {
	mongoose.connect(MONGO_URI)

	mongoose.connection.on("connected", () => {
		console.log("Connected to MongoDB Successfully");
	});

	mongoose.connection.on("error", (err) => {
		console.log("An error occurred while connecting to MongoDB");
		console.error(err);
	});

	app.listen(PORT, () => {
		console.log('Listening on port, ', PORT)
	})
}

module.exports = app