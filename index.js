const express = require('express');
const passport = require('passport');
const bodyParser = require("body-parser");
require('dotenv').config();

//routes
const userAuth_Router = require('./routes/userAuth');
const orderRouter = require('./routes/order');

//db
const connectDB  = require('./db/connect');
//authentication route
require('./authentication/authenticate');

const app = express();

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


// User Registration & login middleware
app.use('/', userAuth_Router )

//home page
app.get('/', (req, res) => {
    res.json({ status: true, message: 'HomePage' })
})


//order router
app.use('/order', passport.authenticate('jwt', { session : false }), orderRouter );




// All Invalid (404) route 
app.all('*', (req, res)=>{
    res.status(404).send('Invalid Route')
})

// error handler
app.use((error,req,res, next ) =>{
    console.log(error)
    res.status(505).json({
        message: error.message
    })
})


//.env
const PORT = process.env.PORT || 3335;
const MONGO_DB_URI = process.env.MONGO_DB_URI


//server & database connection
const start = async() =>{
    try {
        //connect to DB
       await connectDB(MONGO_DB_URI)
    //    console.log("Connected to MongoDB Successfully");
    
    //connect to server
     app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

    } catch (error) {
        console.log(`Unable to initial connection: Error info: ${error}`)
    }
}

start()

