require('dotenv').config()
const express = require('express')
const ordersRoute = require('./routes/orders')
const usersRoute = require('./routes/users')
const errorHandler = require('./middleware/errHandler')
const { connectToMongoDB } = require("./middleware/db")

const app = express()

app.use(express.json())

app.use('/api/orders', ordersRoute)
app.use('/api/users', usersRoute)

app.all('/', (req, res) => {
    return res.json({ status: true })
})

app.use(errorHandler)

//connect to mongoDb
connectToMongoDB()

// Connect server
const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})