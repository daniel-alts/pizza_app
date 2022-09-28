const express = require('express');
const moment = require('moment');
const orderModel = require('./orderModel');
require('dotenv').config()

const { connectDB } = require('./db/connect')
const app = express()



// const {connectDB}
//.env
const PORT = process.env.PORT || 3334;
const MONGO_DB_URI = process.env.MONGO_DB_URI


//middleware
app.use(express.json());
const orderRouter = require('./routes/order');


app.get('/', (req, res) => {
    return res.json({ status: true })
})

//order router
app.use('/order', orderRouter );






const start = async() =>{
    try {
        //connect to DB
       await connectDB(MONGO_DB_URI)
       console.log("Connected to MongoDB Successfully");

       //connect to server

       app.listen(PORT, () => {
        console.log('Listening on port, ', PORT)
    })

    } catch (error) {
        console.log('Unable to initial connect,' + error)
    }
}

start()
