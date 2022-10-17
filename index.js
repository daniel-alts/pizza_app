const express = require('express');
const passport = require('passport')
const orderRouter = require('./routes/orderroute');
const userRouter = require('./routes/userroute');
const usermodel = require('./model/usermodel');
require('dotenv').config();
const { connectDb } = require('./config/db');


const PORT = 3334

const app = express()

require('./authentication/passport');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());




app.get('/', (req, res) => {
	return res.json({ status: true })
})

app.use('/orders',passport.authenticate('jwt', { session: false }), orderRouter);
app.use('/users', userRouter);

connectDb();

app.listen(PORT, () => {
	console.log('Listening on port, ', PORT)
})

module.exports = app;