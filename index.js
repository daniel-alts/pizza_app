const express = require('express');
const {connectToMongo} = require('./database')
const UserRouter = require('./Routes/UserRoute')
const OrderRouter = require('./Routes/OrderRoute')
// const authorization = require('./authorization')

const PORT = 3334

const app = express()

app.use(express.json());


//connect to mongo 
connectToMongo();


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use("/order", /*authorization,*/ OrderRouter);
app.use("/user", UserRouter);



app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})