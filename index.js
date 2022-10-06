const express = require('express');
require('dotenv').config()

const userRouter = require('./routes/user')
const orderRouter = require('./routes/order');
const connectDB  = require('./db/connect')
const authenticateUser = require('./middleware/authenticate')
const app = express()

app.use(express.json());



// const {connectDB}
//.env
const PORT = process.env.PORT || 3334;
const MONGO_DB_URI = process.env.MONGO_DB_URI

app.get('/', (req, res) => {
    res.json({ status: true })
})




//User router
app.use('/user', userRouter)
//order router
app.use('/order', authenticateUser, orderRouter );

app.all('/', (req, res) => {
    return res.json({ status: true })
  })

// error handler
app.use((error,req,res, next ) =>{
    console.log(error)
    res.status(505).json({
        message: error.message
    })
})


//server & database connection
const start = async() =>{
    try {
        //connect to DB
       await connectDB(MONGO_DB_URI)
       console.log("Connected to MongoDB Successfully");

       //connect to server

     app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

    } catch (error) {
        console.log('Unable to initial connect,' + error)
    }
}

start()

