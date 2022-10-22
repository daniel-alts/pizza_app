const express = require('express');
const BasicAuth = require('./middleware/basicAuth');
const OrderRouter = require('./routes/OrderRoutes');
const AuthRouter = require('./routes/AuthRoutes');
const Database = require('./database');

const PORT = 3334

const app = express()

// connect to database
Database.connect();

// register passport
require("./passport") 

// middleware
app.use(express.json());
// app.use(BasicAuth)

// routes
app.use('/', OrderRouter)
app.use('/', AuthRouter)

// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})