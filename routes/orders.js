const express = require("express")
const moment = require('moment')
const orderModel = require("../models/orderModel")
const {authenticate} = require("../authentication/authenticate")
// const users = require("./routes/users")

const orderRoute = express.Router()

// create new order
orderRoute.post("/", (req, res) => {
    const body= req.body;
    // return res.json({ status: true, body })
   

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order=  orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    }).then(
        (order) =>{
            res.json({ status: true, message: order })
        }
    ).catch(
        (err) =>{
            res.status(404).send(err)
        }
    )
    
})


// get a specific order by ID
orderRoute.get('/:orderId',async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    // const order = await orderModel.find(order => order.id == id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, message: order })
})


// get all orders
orderRoute.get('/',(req, res) => {

    authenticate (req, res)
    .then(()=>{
        const orders = orderModel.find()
        return res.json({ status: true, orders })

    }).catch((err)=>{
        res.status(404).json(
            {
                status: false,
                message: err
            }
        )
    })
   
})

// update state of order
orderRoute.patch('/:id', async (req, res) => {
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

    order.save()

    return res.json({ status: true, order })
})


// delete an order
orderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


module.exports = orderRoute