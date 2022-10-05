const express = require('express');
const {connectToMongo} = require('./database')
const UserRouter = require('./Routes/UserRoute')
const OrderRouter = require('./Routes/OrderRoute')
// const authorization = require('./authorization')



const app = express()

//connect to mongo 
connectToMongo();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use("/order", OrderRouter);
app.use("/user", UserRouter);


module.exports = app