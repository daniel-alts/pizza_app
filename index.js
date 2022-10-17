const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');
const OrderRoute = require("./Routes/OrderRoute")
const UserRoute = require("./Routes/UserRoute")
const UserModel = require("./models/UserModel")
const authenticate = require("./auth")
const local = require('./local')
require("dotenv").config()

const PORT = 3334

const app = express()

app.use(express.json());

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser())
app.use( session({
	secret: "secret",
	resave: false, 
	saveUninitialized: true,
	cookie: { maxAge: 60*60*1000}
}))
app.get('/', (req, res) => {
    return res.json({ status: true })
})

// Routes
app.use("/", OrderRoute)
app.use("/user", passport.authenticate(local), UserRoute)

mongoose.connect(process.env.MONGO_URI)

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
