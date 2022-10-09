const express = require('express');

const passport = require('passport');
const bodyParser = require('body-parser');

const db = require('./db')
const orderRoute = require('./routes/order.route')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth')


require('dotenv').config()

require("./authentication/auth") 

// const createServer = require('./server')
const app = express()

const PORT = 3334


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/', authRoute);

// Connect to MongoDB
db.connectToMongoDB();


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('/orders', passport.authenticate('jwt', {session:false}), orderRoute)
app.use('/user', userRoute)


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})