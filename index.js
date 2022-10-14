const express = require('express');
const orderRoute = require("./routes/orders")
const { connectToMongoDb } = require("./db")
// const {authenticate} = require("./authentication/authenticate")
const usersRoute = require("./routes/users")
require("dotenv").config()
require("./authentication/auth") // signup and login authentication middleware. Ensure the middleware is available at the top before accessing any route
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoute = require("./routes/authRoute")

const PORT = process.env.PORT

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

// connect to mongoDB instance
connectToMongoDb()

app.use(express.json());
// app.use(bodyParser.json())

// define views
app.use("/", authRoute) // authRoute is not protected so we can perform login, sign up and other functions needed for authentication
app.use("/users", passport.authenticate('jwt', {session: false}) ,usersRoute) // using a jwt strategy for authentication, seesion is false to prevent saving the token in browser
app.use("/order", passport.authenticate('jwt', {session: false}) ,orderRoute) 

app.get('/', (req, res) => {
   res.send("Welcome to Alexander pizza App")
})

// handling errors
app.use(function(err, req, res, next){
    console.log(err)
    res.status(err.status || 500).json({
        status: false,
        error: err.message
    })
})

app.listen(PORT, ()=>{
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})
