const express = require('express');
const moment = require('moment');
const { connectMongodb } = require('./config/mongodb');
const authenticateUser = require('./middleware/auth');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
require("dotenv").config()
const session = require('express-session')
const passport = require('passport');  
const connectEnsureLogin = require('connect-ensure-login'); 
const userModel  = require("./modal/userModel")


const PORT = process.env.PORT

const app = express()

app.use(express.json());

// app.use("/order", authenticateUser, orderRoute) //for JWTtoken strategy
app.use("/order", connectEnsureLogin.ensureLoggedIn(), orderRoute)
app.use("/auth", authRoute)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 1000 } 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(userModel.createStrategy()); 

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.get('/', (req, res) => {
    return res.json({ status: true })
})


connectMongodb()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})