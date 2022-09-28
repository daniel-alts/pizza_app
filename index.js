const express = require('express');
const mongoose = require('mongoose');
const ordersRouter = require('./routes/order')
const userRouter = require('./routes/user')


const PORT = 3334

const app = express()

app.use(express.json());

app.use('/orders', ordersRouter)
app.use('/users', userRouter)



// app.get('/', (req, res) => {
//     return res.json({ status: true })
// })




// app.get('/order/:orderId', async (req, res) => {
//     const { orderId } = req.params;
//     const order = await orderModel.findById(orderId)

//     if (!order) {
//         return res.status(404).json({ status: false, order: null })
//     }

//     return res.json({ status: true, order })
// })

// app.get('/orders', async (req, res) => {
//     const orders = await orderModel.find()

//     return res.json({ status: true, orders })
// })

// app.patch('/order/:id', async (req, res) => {
    // const { id } = req.params;
    // const { state } = req.body;

    // const order = await orderModel.findById(id)

    // if (!order) {
    //     return res.status(404).json({ status: false, order: null })
    // }

    // if (state < order.state) {
    //     return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    // }

    // order.state = state;

    // await order.save()

    // return res.json({ status: true, order })
// })

// app.delete('/order/:id', async (req, res) => {
//     const { id } = req.params;

//     const order = await orderModel.deleteOne({ _id: id})

//     return res.json({ status: true, order })
// })


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