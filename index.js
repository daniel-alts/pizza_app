const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser')

const AuthRoute = require('./routes/authRoute')
const OrderRoute = require('./routes/orderRoute')
const UserRoute = require('./routes/userRoute');

require('./database').connectToMongoDb()
require("dotenv").config()
require('./authenticate/passport')

const PORT = process.env.PORT
const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize())

app.use('/auth', AuthRoute)
app.use('/order', passport.authenticate('jwt', {session: false}), OrderRoute)
app.use('/user', passport.authenticate('jwt', {session: false}), UserRoute)

app.listen(process.env.PORT, () => {
    console.log('Listening on port, ', PORT)
})

