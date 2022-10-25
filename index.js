const express = require('express');
const mongoose = require('mongoose');

//importing routers
const orderRouter = require('./routes/OrderRoutes');
const authRouter = require('./routes/AuthRoutes');
const passport = require('passport');

//import authentication middleware
require('./middleware/BasicAuth');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using the routers
app.use('/user', authRouter);
app.use(
	'/orders',
	passport.authenticate('jwt', { session: false }),
	orderRouter
);

app.get('/', (req, res) => {
	return res.json({ status: true });
});

app.all('*', (req, res) => {
	return res.status(404).json({ status: false, msg: 'page not Found' });
});

// Handle errors.
app.use((err, req, res, next) => {
	if (err.code === 11000) {
		return res.status(500).json({
			status: false,
			error: `username ${body.username} is taken already `,
		});
	}

	// let newMessage = Object.values(error.errors).map(element => element.message).join(' , ')
	// if(newMessage){
	//     return res.status(500).json({ status: false, message: newMessage} )
	// }

	res.status(err.status || 500);
	res.json({ error: err.message });
});

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

module.exports = app;
