const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('./middlewares/requireAuth');
const orderRouter = require('./routes/order.route');
const userRouter = require('./routes/user.route');

const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
	return res.json({ status: true })
})

app.use('/user', userRouter)
// Protect all routes under /order
app.use('/order', requireAuth, orderRouter)


mongoose.connect('mongodb://localhost:27017/pizza')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
	console.log('Listening on port, ', PORT)
})