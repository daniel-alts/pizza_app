const express = require('express');
const connectToMongodb = require('./pizzadbapp');
const orderRoute = require('./route/orderRoute');
const userRoute = require('./route/userRoute');
require('./authorization');
const PORT = 3334
connectToMongodb();
const app = express()

// register passport
require("./passport") 

// middleware
app.use(express.json());
app.use(express.urlencoded())

app.use('/', userRoute)
app.use('/', orderRoute)

// routes
app.use('/orders', passport.authenticate('jwt', { session: false  }), OrderRouter)
app.use('/',  AuthRouter)

// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})



app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})