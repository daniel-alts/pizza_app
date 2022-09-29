const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');

const User = require('./Users/userModel');
const authenticate = require('./authenticate')

const PORT = 3334;

require('dotenv').config();
const app = express()

app.use(express.json());


app.post('/signup', async (req, res) => {

    const body = req.body;
    const user = await User.User.create(body);

    return res.json(user);
    
})

app.post('/hello', async (req, res) => 
{

    const body = req.body;
    authenticate.authenticate(req, res)

    ordering();


})



async function ordering (req, res)
{
 
    
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

    const queryParam = await `{"${req.query.queryParam}": 1}`;
    const paginateLimit = await req.query.limit;

    const objectParse = await JSON.parse(queryParam);

//This is to select between query param total_price or to sort by Date

    //this would sort the total_price from ascending to descending
    const orders = await orderModel.find().sort(objectParse).limit(paginateLimit); //for pagination

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

// app.get("/order"){

//     const o

// }

    
}


app.get('/', (req, res) => {
    return res.json({ status: true })
})



mongoose.connect('mongodb://localhost:27017')

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


module.exports = app