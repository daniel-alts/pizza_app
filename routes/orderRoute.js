const express = require('express')
const orderModel = require('../models/orderModel');
const moment = require('moment');
const userModel = require('../models/userModel')
const app = express.Router()




app.post('/:username', async (req, res) => {
    // athenticate if the user is in the database
const { username } = req.params
const verifyUser = await userModel.find({ username: username})
if (verifyUser.length == 0) {
    res.status(400).send('you cannot order: kindly register to order')

}
// if user exists take in order
else {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += (curr.price * curr.quantity)
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })

}

   
})

app.get('/:username/:orderId', async (req, res) => {
    // athenticate if the user is in the database
const { username } = req.params
const verifyUser = await userModel.find({ username: username})
if (verifyUser.length == 0) {
    res.status(400).send('you cannot order: kindly register to order')

}
// if user exists display order of the given ID
else {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}
})
//get all orders
app.get('/:username', async (req, res) => {
    // athenticate if the user is in the database
const { username } = req.params
const verifyUser = await userModel.find({ username: username})
if (verifyUser.length == 0) {
    res.status(400).send('you cannot order: kindly register to order')

}
// if user exists display all orders
else {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
}
})

//get orders by certain query params like date created, highest to lowest price and state
app.get('/', async (req, res)=>{
    const { price, date, state } = req.query
    let type = ['asc', 'dsc']
    let sorting = [1, -1]
    if (price == 'asc'){
        
        const order = await orderModel.find({}).sort({total_price: price == 'asc' ? 1 : price == 'dsc' ? -1 : 'Not a valid price type' })
        res.send({order})
    }if (price == 'dsc') {
        const order = await orderModel.find({}).sort({total_price: -1})
        res.send({order})
    }if (date == 'asc') {
        const order = await orderModel.find({}).sort({created_at: 1})
        res.send({order})
    }if (date == 'dsc') {
        const order = await orderModel.find({}).sort({created_at: -1})
        res.send({order})
    }if(state){
        const order = await orderModel.find({state: state})
        res.send({order})
    }
    
})
// pagination
app.get('/', async(req, res)=>{
    const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 100;
	const skip = (page - 1) * limit;

    const order = await orderModel.find({}).skip(skip).limit(limit)
    res.send({order})
})


app.patch('/:username/:id', async (req, res) => {
    
    const { username } = req.params

    const verifyAdmin = await userModel.find({username: username, user_type:"admin"})
    if (verifyAdmin.length == 0) {
        res.status(400).send('you cannot modify order')
    
    }
    else {
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
}
})

app.delete('/:username/:id', async (req, res) => {
    const { username } = req.params

    const verifyAdmin = await userModel.find({username: username, user_type:"admin"})
    if (verifyAdmin.length == 0) {
        res.status(400).send('you cannot modify order')
    
    }
    else {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
    }
})

module.exports = app
