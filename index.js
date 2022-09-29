const express = require('express');
const ORDERROUTES = require('./routes/orderRoutes');
const USERROUTES = require('./routes/usersRoutes');
const AUTH = require('./routes/authRoutes');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
const errController = require('./controllers/errController');

const app = express();
app.use(express.json());
app.use(morgan('common'));

app.use('/api/orders', ORDERROUTES);
app.use('/api/', AUTH);
app.use('/api/users', USERROUTES);

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Can't find ${req.originalUrl} on this server!!`,
			404,
		),
	);
});

app.use(errController);
module.exports = { app };
