const express = require('express');
const {connectToMongoDB} = require('./db');
const ordersRoute = require('./routes/orders');
const userRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const bodyParser = require('body-parser');
const passport = require('passport')

require("dotenv").config()
const PORT = process.env.PORT;

const app = express()

// Connect to MongoDB
connectToMongoDB();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Use passport middleware
// app.use(passport.initialize())
// require('./authentication/auth')(passport)

app.use('/orders', ordersRoute);
app.use('/users', userRoute);
app.use('/login', loginRoute)


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})