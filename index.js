require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const connectToDB = require('./db')
const passport = require('passport');
const userRoutes = require('./route/routes')
 require('./errorHandler')
const bodyParser = require('body-parser');
const userController = require('./controllers/login')
const router = require('./controllers/orderController')

require("./middleware/auth")
const app = express();

app.use(express.json())
app.use('/users', userRoutes)
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userController);
//app.use('/orders', passport.authenticate('jwt', { session: false }), router);
app.use('/order', router)

app.all('/', (req, res) => {
    return res.json({status:true})
})

const PORT = process.env.PORT || 3777

const MONGO_URI = process.env.MONGO_URI


//connectToDB
connectToDB(MONGO_URI)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})