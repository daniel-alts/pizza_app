const express = require('express');
const dbConnection = require('./src/config/dbConfig')
const CONFIG = require("./src/config/config.js")
const errorMiddleware = require("./src/middlewares/errorHandler")

const PORT = CONFIG.PORT || 3000

//start express app
const app = express()


//initialize database
dbConnection()

const orderRouter = require('./src/routes/order')
const userRouter = require('./src/routes/userRoutes');

//midlewares
app.use(express.json());
app.use(express.static("public"))


//routes
app.use('/order', orderRouter)
app.use('/account', userRouter)


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})