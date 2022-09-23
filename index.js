const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');

const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.post('/order', async (req, res) => {
    const body = req.body;

    //const total_price = body.items.reduce((prev, curr) => {
        //prev += curr.price
       // return prev
    //}, 0);


//basic authentication 
    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price : body.total_price
    })
    //***basic authentication
    if(!order.items || !order.total_price){
        return res.status(404).json({message: "Inputs are required"})
        }
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
    /*Pagination*/
    const limitVal = req.query.limit || 3;
    const skipVal = req.query.skip || 0
    const orders = await orderModel.find().limit(limitVal).skip(skipVal);

    return res.json({ status: true, orders })
})

app.patch('/order/:id', async (req, res) => {
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

app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


mongoose.connect('mongodb://127.0.0.1:27017/orders', {UseNewUrlParser: true})

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