const orderModel = require('../models/orderModel');
const moment = require('moment');

const getAllOrders = async (req, res) => {
    // try{
    const {state, sort} = req.query
    const queryObject = {}
    
    if(state){
        queryObject.state = state
    }

    let orders = await orderModel.find(queryObject)

    if(sort){
        res.json(sort)
    }

    const page = +req.query.page || 1
    const limit = +req.query.limit || 3
    const skip = (page - 1) * limit

    // orders = await orders.skip(skip).limit(limit)

    return res.json({ status: true, orders, reached: true })
    // } catch (error) {
    //     res.status(500).send(error)
    // }
}

const getOrder = async(req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }
        return res.json({ status: true, order })
    } catch (error) {
        res.status(500).send(error)
    }
}

const addOrder = async(req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send("error: something went wrong")
    }
}


const updateOrder = async(req, res)=>{
    try {
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
    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteOrder = async(req, res) =>{
    try {
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id})
    
        return res.json({ status: true, order })
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { getAllOrders, getOrder, updateOrder, deleteOrder, addOrder }