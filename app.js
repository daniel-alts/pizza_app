const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const { connectToDatabase } = require('./config/database');
const configurePassport = require('./config/passport');

// const requireAuth = require('./middlewares/requireAuth');
const orderRouter = require('./routes/order.route');
const userRouter = require('./routes/user.route');

dotenv.config();

const PORT = 3334

const app = express()

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { httpOnly: true, maxAge: 2419200000 }
}));

configurePassport(passport);
app.use(passport.initialize());

app.use(express.json());

// Configure ejs views
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	return res.render('index');
})

app.use('/user', userRouter)
app.use('/order', passport.authenticate('jwt', { session: false }), orderRouter)

if (process.env.NODE_ENV !== 'test') {
	connectToDatabase();

	app.listen(PORT, () => {
		console.log('Listening on port, ', PORT)
	})
}

module.exports = app