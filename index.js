const express = require('express');

// ---------- Import Modules ----------
const { connectToMongoDb } = require("./db/db")
const orderRouter = require("./routes/order")

const app = express()
app.use(express.json());

// ----------- Connecting to MongoDB instance ----------
connectToMongoDb()

// API Home Route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

// ------------ Use API Routes -----------------
app.use('/pizza', orderRouter)


// Server Config
const PORT = 3334
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})