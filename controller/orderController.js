
const moment = require('moment')
const orderModel = require('../models/orderModel');


const createNewOrder = async (req,res) => {
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
}

const getOrderById = async (req,res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)
    
    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

const getAllOrders = async (req,res) => {
    // check for query parameters
    const { price, date, state } = req.query

    // query by price
    if(price){
        let value;
        if(price === 'asc'){
            value = 1
            const orders = await orderModel.find().sort( {total_price : value} )
            return res.json({ status: true, orders })
        }

        if(price === 'desc'){
            value = -1
            const orders = await orderModel.find().sort( {total_price : value} )
            return res.json({ status: true, orders })
        }
        // query by date
    } else if(date){
        let value;
        if(price === 'asc'){
            value = 1
            const orders = await orderModel.find().sort( {created_at : value} )
            return res.json({ status: true, orders })
        }

        if(price === 'desc'){
            value = -1
            const orders = await orderModel.find().sort( {created_at : value} )
            return res.json({ status: true, orders })
        }
    } 

    // PAGINATION //
    const page = req.query.page * 1
    const limit = req.query.limit * 1
    const skip = (page - 1) * limit

    const orders = await orderModel.find().skip(skip).limit(limit)

    return res.json({ status: true, orders })
}

const updateOrder = async (req,res) => {
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

const deleteOrder = async (req,res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
}

module.exports = {
    createNewOrder,
    getOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder
}