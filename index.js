const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const userRoute = require("./Routers/userRoute");
const orderRoute = require('./Routers/orderRoute')
const ordersRoute = require('./Routers/ordersRoute')
const dbConfig = require("./config/database")

dbConfig()
require('./middleware/auth');

const PORT = 3334

const app = express()

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoute);
app.use("/order",  passport.authenticate('jwt', { session: false }), orderRoute);
app.use("/orders",  passport.authenticate('jwt', { session: false }), ordersRoute);


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

