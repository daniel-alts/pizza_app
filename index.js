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
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);



app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        return res.status(500).json({ status: false, message: "Server Error!"} )
    }
    else next();
});


app.get('*', (req, res) => {
    return res.status(404).json({ status: false, message: "Not Found"});
});




//START THE SEVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})



module.exports = app;