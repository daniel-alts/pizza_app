const express = require('express');
const authRouter = require('./routes/authRoutes');
require('dotenv').config()
const OrderRouter = require('./routes/OrderRoutes');
const UserRouter = require('./routes/UserRoutes')
const db = require('./database');
const userRouter = require('./routes/UserRoutes');



const PORT = process.env.PORT|| 3334

const app = express()

// connect to database
db.connectToMongoDB() 


// middlewares
app.use(express.json());
require('./passport')




// routes
app.use('/order', OrderRouter)
app.use('/user', userRouter) 


// home route
app.get('/', (req, res) => {
res.send("Welcome to our pizza-app") 
})

// catch all errors
app.use('*', (req, res) => {clea
    res.status(404).send('route not found')
})

app.listen(PORT, () => {
    console.log(`Server started, listening on ${PORT}`)
})