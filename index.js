const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const pizzaRoute = require("./routes/orderRoutes");
const userRoute = require("./routes/userRoutes");

require("./db").connectToMongoDB(); //Connection to MongoDB

require("dotenv").config();

require('./authentication/authenticateUser'); // Signup and login authentication middleware

const PORT = process.env.PORT;
const app = express()  

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", userRoute)

//Checks for authentication before any order route is accessed
app.use('/pizza', passport.authenticate('jwt', { session: false }), pizzaRoute); 

app.get("/", (req, res) => {
    res.send("Welcome to the World of Pizza!") //Home Page
});

//Handle errors
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})


module.exports = app