const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./models/orderModel');
const userModel = require('./models/userModel');
const bcrypt = require('bcrypt');

const PORT = 3334

const app = express();

const users = []

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ status: true });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try{
        const { username, password, user_type } = req.body
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            username,
            password: hashedPassword,
            user_type
        }
        const newUser = new UserModel(user);
        newUser.save()
            .then((result) => {
                return res.status(201).json({ status: true, data: result })
            })
            .catch((err) => {
                console.log('An error occured', err)
                return res.status(400).json({ status: false, message: err.message })
            })
    } catch {
        res.json(err)
    };
});

app.post('/users/login', async (req, res) => {
    const users = await userModel.find({});
    const user = await users.find((user) => user.name = req.body.name);

    if(user == null){
        return res.status(400).send('cannot find user');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Access Granted');
        } else {
            res.send('Access Denied');
        };
    } catch {
        res.status(500).send();
    };
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
    });
    
    return res.json({ status: true, order });
});

app.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);

    if (!order) {
        return res.status(404).json({ status: false, order: null });
    };

    return res.json({ status: true, order });
});

app.get('/orders?limit=20&offset=100', async (req, res) => {

    let orders;

    const { price, date } = req.query;

    if(price) {
        const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
        if(value){
            orders = await orderModel.find({}).sort({ total_price: value })
        };
    } else if (date) {
        const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
        if(value) {
            orders = await orderModel.find({}).sort({ created_at: value })
        };
    };
    if(!orders) {
        orders = await orderModel.find({})
    }
    return res.json({ status: true, orders });
});

app.patch('/order/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id);

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    };

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' });
    };

    order.state = state;

    await order.save();

    return res.json({ status: true, order });
});

app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id});

    return res.json({ status: true, order });
});


mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
});