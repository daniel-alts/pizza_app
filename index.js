const http = require('http');
const express = require('express');
const ORDERROUTES = require('./routes/orderRoutes');
const AUTH = require('./routes/authRoutes');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
const app = express();
app.use(express.json());
app.use(morgan('common'));

app.use('/api/orders', ORDERROUTES);
app.use('/api/', AUTH);

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Can't find ${req.originalUrl} on this server!!`,
			404,
		),
	);
});

app.use = (err, req, res, next) => {};
module.exports = { app, http };
