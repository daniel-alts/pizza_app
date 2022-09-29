const express = require('express');
const dbConnection = require('./dbConfig')
const CONFIG = require("./config/config")

const PORT = CONFIG.PORT || 3000

//start express app
const app = express()


//initialize database
dbConnection()

const orderRouter = require('./routes/order')
const userRouter = require('./routes/userRoutes');

//midlewares
app.use(express.json());
app.use(express.static("public"))


//routes
app.use('/order', orderRouter)
app.use('/account', userRouter)


app.get('/', (req, res) => {
    return res.json({ status: true })
})



app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})