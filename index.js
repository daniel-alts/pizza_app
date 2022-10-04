const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');
const userModel = require('./userModel');

const PORT = 3334

const app = express()

app.use(express.json());

app.get('/users', (req, res) => {
    return res.json({ message: 'List of users here' })

})

//function for protecting routes
const isAuthenticated = async(req, res, next) => {
    let authheader = req.headers.authorization;
    // console.log(req.headers);

    if (!authheader) {

        res.setHeader('WWW-Authenticate', 'Basic');

        return res.status(401).json({ message: 'Please provide authentication details' })

    }
    console.log(authheader);
    let auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];

    const userObj = await userModel.findOne({ username: user, password: pass });

    if (userObj) {

        // If Authorized user
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');

        return res.status(401).json({ message: 'User not authorized' })
    }
}

//throwaway login function
const isAuthenticatedforlogin = async(req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username, password: password });
    if (user) {
        next();
    } else {
        return res.status(404).json({ message: 'User not found' })
    }
}

//throwaway login route
app.post('/user/login', isAuthenticatedforlogin, (req, res) => {

    return res.json({ message: 'Logged In' })

})

//signup route to create new user without validations
app.get('/user/signup', async(req, res) => {
    const user = await userModel.create(req.body)
    return res.status(200).json({ user: user, message: 'User successfully signed up' })

})

//pagination function
const printOrders = async(startValue, nPerPage) => {
    let orders = await orderModel.find({})
        .sort({ _id: -1 })
        .skip(startValue * nPerPage)
        .limit(nPerPage)


    return orders;


}

//home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

//create order route
app.post('/order', isAuthenticated, async(req, res) => {
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

app.get('/order/:orderId', isAuthenticated, async(req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

// app.get('/orders', isAuthenticated, async(req, res) => {
//     const orders = await orderModel.find()

//     return res.json({ status: true, orders })
// })

// app.get('/orders/:state', isAuthenticated, async(req, res) => {
//     const { state } = req.params;
//     const orders = await orderModel.find({ state: state })

//     return res.json({ status: true, orders })
// })

app.post('/orders', isAuthenticated, async(req, res) => {

    const page = req.query.page;
    const nperpage = req.query.nperpage;
    const sortby = req.query.sortby;
    const state = req.query.state;
    if (state) {
        const orders = await orderModel.find({ state: state })

        return res.json({ status: true, orders })
    }
    if (sortby === 'total_price') {
        const orders = await orderModel.find({}).sort({ "total_price": 1 })

        return res.json({ status: true, orders: orders })
    }
    if (sortby === 'date') {
        const orders = await orderModel.find({}).sort({ "created_at": 1 })

        return res.json({ status: true, orders: orders })
    } else {
        const orders = await printOrders(page || 0, nperpage || 1);

        return res.json({ status: true, orders })

    }
})

app.patch('/order/:id', isAuthenticated, async(req, res) => {
    const { id } = req.params;
    const { state } = req.body;

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

app.delete('/order/:id', isAuthenticated, async(req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.json({ status: true, order })
})


mongoose.connect('mongodb://localhost:27017/pizza_app')

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})