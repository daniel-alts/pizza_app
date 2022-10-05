const express = require('express');
const moment = require('moment');
const mongodbConnect = require('./mongooseDbConnect/connectDb');
const { authentication } = require('./authentication/authenticate')
const orderRoute = require('./route/orderRoute');
const {userRoute} = require('./route/userRoute')

const PORT = 6000

const app = express()

app.use(express.json());

app.use('/users',  userRoute)
// app.use("/login", userRoute)
app.use('/orders', orderRoute )


app.get('/', (req, res) => {
    return res.json({ status: true })

})

app.all("*",(res, req)=>{
    return res.status(404).json({status: false, message: 'page not found'})
})
app.use((err, req, res, next)=>{
    console.error(err)
    res.status(500).send(err.message)
})
mongodbConnect()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})