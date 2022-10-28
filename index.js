const express = require('express');
const passport = require('passport');
const bodyParser = require("body-parser");


//routes
const userAuth_Router = require('./routes/userAuth');
const orderRouter = require('./routes/order');


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
    res.status(404).json({ message : 'Invalid Route'})
})

// error handler
app.use((error,req,res, next ) =>{
    console.log(error)
    res.status(505).json({
        message: error.message
    })
})

module.exports = app;