
if(process.env.NODE_ENV !== 'production'){
	require("dotenv").config();
}

const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');



const {orderRouter} = require('./Router/orderRouter')
const {userRouter} = require('./Router/userRouter');
const passport = require('./passport/passport_config')
const app = express()

const PORT = 3334
app.use(express.json());
app.use("/user", userRouter)
app.use("/order", orderRouter) 

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({mongoUrl: 'mongodb+srv://Arthur_2002:1234arthur@cluster0.tzk9r.mongodb.net/?retryWrites=true&w=majority'})
	})
)



app.use(passport.initialize())
app.use(passport.session())



mongoose.connect('mongodb+srv://Arthur_2002:1234arthur@cluster0.tzk9r.mongodb.net/?retryWrites=true&w=majority')

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