const express = require('express');
const connectToDatabase = require('./src/db'); //Database connection
const ordersRoute = require('./src/routes/ordersRoute');
const authRoute = require('./src/routes/authRoute');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./src/middlewares/authentication');
require('dotenv').config();

//CREATE SERVER
const app = express();

//APPLICATION LEVEL MIDDLEWARES
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Routes
app.use('/', authRoute);
app.use('/orders', passport.authenticate('jwt', { session: false }), ordersRoute);


//Home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})


//Error Middleware
app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        return res.status(500).json({ status: false, message: "Server Error!"} )
    }
    else next();
});



//Catch all route
app.get('*', (req, res) => {
    return res.status(404).json({ status: false, message: "Not Found"});
});




//START THE SEVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})



module.exports = app;