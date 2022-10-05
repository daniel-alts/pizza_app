const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');
const UserRoute = require("./Routes/UserRoutes")
const authenticate = require("./authenticate")

const PORT = 3334

const app = express()

app.use(express.json());


app.use("/user", UserRoute);


app.get('/', (req, res) => {
    authenticate(req,res)
        .then(() => {
            return res.json({ status: true })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })
})


app.post('/order', (req, res) => {
    authenticate (req,res)
        .then(async() => {
            const body = req.body.order;

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
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })
})

app.get('/order/:orderId', (req, res) => {
    authenticate(req,res)
        .then(async () => {
            const { orderId } = req.params;
            console.log(orderId);
            const order = await orderModel.findById(orderId)

            if (!order) {
                return res.status(404).json({ status: false, order: null })
            }

            return res.json({ status: true, order })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })
    })

app.get('/orders', (req, res) => {
    authenticate(req,res)
        .then(async() => {
            const orders = await orderModel.find()

            return res.json({ status: true, orders })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })
})

app.patch('/order/:id', (req, res) => {
    authenticate(req,res)
        .then(async() => {
            const { id } = req.params;
            const { state } = req.body.order;

            const order = await orderModel.findById(id)

            if (!order) {
                return res.status(404).json({ status: false, order: null })
            }

            if (state < order.state) {
                return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
            }

            order.state = state;

            order.save()

            return res.json({ status: true, order })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })

})

app.delete('/order/:id', (req, res) => {
    authenticate(req,res)
        .then(async() => {
            const { id } = req.params;

            const order = await orderModel.deleteOne({ _id: id})

            return res.json({ status: true, order })
        }).catch((err) => {
            return res.json({ status: false, message: err })
        })

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