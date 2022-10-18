const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')

const { DBconnection } = require('./db')

const orderRoute = require('./routes/orderRoute')
const userRoute = require('./routes/userRoute')
const newOrder = require('./routes/newOrder')

require('dotenv').config()
require('./authentication/auth')

const PORT = 3334
const app = express()
DBconnection()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/', userRoute)

app.use('/order', orderRoute)
app.use('/neworder', passport.authenticate('jwt', { session: false }), newOrder)


app.get('/', (req, res) => {
    res.send('home')
    
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})