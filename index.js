const express = require('express');
const connectToDatabase = require('./src/db'); //Database connection
const orderRoutes = require('./src/routes/orderRoutes');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();


//CREATE SERVER
const app = express()

//APPLICATION LEVEL MIDDLEWARES
app.use(express.json());
//Routes
app.use('/order', orderRoutes);
app.use('/user', userRoutes);



app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.use((error, req, res, next) => {
    console.log(error);
    if (error.type == "Bad Request") {
        res.status(400).json({ status: false, message: "An error occured."} )
    }
    next();
});


app.get('*', (req, res) => {
    res.status(404).json({ status: false, message: "Page Not Found"});
});




//START THE SEVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})