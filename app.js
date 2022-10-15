const express = require('express');
const mongoose = require('mongoose');
const orderRouter = require('./routes/orderRoute')
const authRouter = require('./routes/authRoute')
require('./authentication')
const PORT = 3334

const app = express()

//intialize passport
const passport = require('passport');
app.use(passport.initialize())
app.use(express.json());
app.use('/orders', passport.authenticate('jwt', {session: false}), orderRouter);
app.use('/', authRouter)




app.get('/', (req, res) => {
   res.send('welcome to my pizza api')
})


mongoose.connect('mongodb://localhost:27017/pizza_app_api')

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