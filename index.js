const express = require('express');
const {connectToMongoDB} = require('./config/dbConfig');
const orderRouter = require('./routes/order');
const {userRouter} = require('./routes/user');
const bodyParser = require('body-parser');

require('dotenv').config()

const PORT = process.env.PORT

const app = express()

connectToMongoDB()

app.use(bodyParser.json());


app.use('/order', orderRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
    return res.status(200).send("Welcome to the pizza store")
});



app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
});



// module.exports = app