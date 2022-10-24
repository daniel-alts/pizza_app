const express = require('express');
const morgan = require("morgan");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const session = require("express-session");
const mongoose = require('mongoose');
const orderRouter = require('./Routes/orderRoutes');
const userRouter = require('./Routes/userRoutes');
const dotenv = require("dotenv");
dotenv.config();

const PORT = 3334 || process.env.PORT;

require("./middleware/auth")

const app = express()

app.use(morgan("dev"));
app.use(express.json());

app.use('/orders', passport.authenticate('jwt', { session: false }), orderRouter);
app.use('/users', userRouter);




mongoose.connect('mongodb://localhost:27017/pizzaapi')

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

