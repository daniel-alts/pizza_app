const express = require('express');

const db = require('./db')
// const orderRoute = require('./routes/order.route')
// const userRoute = require('./routes/user.route')

const createServer = require('./server')
const app = createServer()

const PORT = 3334

// const app = express()

// app.use(express.json());

// Connect to MongoDB
db.connectToMongoDB();


// app.get('/', (req, res) => {
//     return res.json({ status: true })
// })

// app.use('/orders', orderRoute)
// app.use('/user', userRoute)


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})