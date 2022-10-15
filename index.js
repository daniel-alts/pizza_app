/* eslint-disable no-undef */
const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const UserModel = require('./models/userModel');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('./auth')

const UserRouter= require('./controllers/user.controller');
const indexRouter = require('./controllers/index.controllers')

const {PORT = 3444} = process.env.PORT;


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(session({secret: "exposedsecret", resave: false, saveUninitialized: true}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}))
app.use(passport.initialize());




app.use('/', indexRouter)
app.use('/users', passport.authenticate('jwt', { session: false }),UserRouter)



mongoose.connect("mongodb+srv://test-project:test-project@cluster0.4qna20m.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection;

db.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});
db.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})