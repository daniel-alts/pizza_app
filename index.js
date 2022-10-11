const express = require('express');
const dbConnection = require('./src/config/dbConfig')
const passport = require('passport');
const bodyParser = require('body-parser')
const CONFIG = require("./src/config/config.js")
const errorMiddleware = require("./src/middlewares/errorHandler")


//import authentication middleware
require("./src/middlewares/auth")


const PORT = CONFIG.PORT || 3000
//start express app
const app = express()


//initialize database
dbConnection()

const orderRouter = require('./src/routes/order')
const authRouter = require('./src/routes/auth');

//midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"))


//routes
app.use('/', authRouter)
app.use('/order', passport.authenticate('jwt', { session: false }), orderRouter)



app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})