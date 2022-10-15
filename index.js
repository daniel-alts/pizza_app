
const express = require('express');
const app = express()
const {connectToMongoDB} = require('./DB_Connection/db')
const passport = require("passport");
require('./authentication/auth')
const orderRoute = require('./routes/orderRoutes')
const userRoute = require('./routes/userRoutes')


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config()

const PORT = process.env.PORT
connectToMongoDB()


app.use(express.json());


app.use(
    "/api/orders",
    passport.authenticate('jwt', { session: false }),
    orderRoute
  );
// app.use('/api/orders', orderRoute)
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})