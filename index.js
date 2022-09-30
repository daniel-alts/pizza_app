const express = require('express');

// ---------- Import Modules ----------
const { connectToMongoDb } = require("./db/db")
const orderRouter = require("./routes/order")
const userRouter = require('./routes/user')

const app = express()
app.use(express.json());
app.use(express.static(__dirname + '/public'))

// ----------- Connecting to MongoDB instance ----------
connectToMongoDb()

// API Home Route
app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/public/index')
})

// ------------ Use API Routes -----------------
app.use('/pizza', orderRouter)
app.use('/user', userRouter)


// Server Config
const PORT = 3334
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})