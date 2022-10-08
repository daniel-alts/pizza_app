const mongoConnect = require('./connections/connect')
const passport = require('passport')
const express = require('express');
const bodyParser = require('body-parser')
const orderRoute = require('./routes/orderRoute')
const authRoute = require('./routes/authRoute')

require('./authentication/auth')

const PORT = 3334;
const app = express()

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

mongoConnect()

app.use(express.json());
app.use('/orders', passport.authenticate('jwt', { session: false }), orderRoute)
app.use('/', authRoute)


app.get('/', (req, res) => {
    res.send('Welcome to the pizza API');
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Listening on port, ${PORT}`)
})
