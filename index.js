const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');
const passport = require('passport');
const orderRouter = require('./routes/orderRoute');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoutes');

const PORT = 3334
require('./db/dB')();
require('dotenv').config();

const app = express();
require('./utils/passport-jwt');

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.post('/order', async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })

    return res.json({ status: true, order })
})

app.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

app.get('/orders', async (req, res) => {
    const orders = await orderModel.find()
const PORT = process.env.PORT || 3000;

    return res.json({ status: true, orders })
})
const app = express();

app.patch('/order/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
app.set('view-engine', 'ejs');

    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
})

app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

    return res.json({ status: true, order })
})
app.use('/', authRouter);

app.use(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  orderRouter
);
app.use('/users', userRouter);

mongoose.connect('mongodb://localhost:27017')
app.get('/', (req, res) => {
  res.render('index.ejs');
});

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
app.get('/login', (req, res) => {
  res.render('Login.ejs');
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
app.get('/signup', (req, res) => {
  res.render('Signup.ejs');
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
  console.log('Listening on port, ', PORT);
});

module.exports = app;