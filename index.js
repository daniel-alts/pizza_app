const express = require('express');
const moment = require('moment');
const orderModel = require('./orderModel');
require('dotenv').config()

const { connectDB } = require('./db/connect')

// const {connectDB}
//.env
const PORT = process.env.PORT || 3334;
const MONGO_DB_URI = process.env.MONGO_DB_URI

const app = express()

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




const start = async() =>{
    try {
        //connect to DB
       await connectDB(MONGO_DB_URI)
       console.log("Connected to MongoDB Successfully");

       //connect to server

       app.listen(PORT, () => {
        console.log('Listening on port, ', PORT)
    })

    } catch (error) {
        console.log('Unable to initial connect,' + error)
    }
}

start()
