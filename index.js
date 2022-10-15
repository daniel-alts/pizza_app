const express = require('express');
const moment = require('moment');
const mongodbConnect = require('./mongooseDbConnect/connectDb');
const orderRouter = require('./routes/orderRoutes');
const userauthRouter = require('./routes/userRoutes')
const passport = require('passport');
const bodyParser = require('body-parser');
require("./authentication/authenticate")


const PORT = 6500

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userauthRouter)
app.use('/orders', passport.authenticate('jwt', { session: false }), orderRouter)



app.get('/', (req, res) => {
    return res.json({ status: true })

})

app.use((err, req, res, next)=>{
    console.error(err)
    res.status(500).send(err.message)
})

app.all("*", (res, req) => {
    res.status(404).json({ status: false, message: 'page not found' })
})
mongodbConnect()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})