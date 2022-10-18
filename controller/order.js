
const orderModel = require('../models/orderModel');
const authenticator = require('../authentication/authenticate')
const moment = require('moment');

//Read/Get all the orders

const getAllOrders = async (req, res, next) => {
    try {
        const {total_price, created_At, state} = req.query
        
        const queryObject = {}
        
        //filter by state
        if(state){
            queryObject.state = state
        }

        let result = orderModel.find()

        //sort (i) total_price & (ii) date in asc order
        result = result.sort('total_price created_At')

        //pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;

        result = result.limit(limit).skip(skip);

        
        const orders = await result
        return res.json({ status: true, mssg: orders, nbHits: orders.length })
        
    } catch (error) {
        console.log(error)
        
    }
}

//create an Order 
const createOrder = async (req, res, next) => {
    try {

        const body = req.body;

        const total_price = body.items.reduce((prev, curr) => {
            prev += curr.price * curr.quantity
            return prev
    }, 0);

        const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
        return res.json({ status: true, order })
        
    } catch (error) {
        next(error)
        
    }
    
}


//Read/get an Order

const getAnOrder = async (req, res, next) => {
    try {

        const { orderId } = req.params;
        const order = await orderModel.findById(orderId)

        if (!order) {
            return res.status(404).json({ status: false, order: null })
    }

        return res.json({ status: true, order })

    } catch (error) {
        next(error)
        
    }
    
}




//Edit/Update an Order

const updateOrder = async (req, res, next) => {
    try {

        const { orderId } = req.params;
        const { state } = req.body;

        const order = await orderModel.findById(orderId)

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
        next(error)
        
    }
    
}

//Delete an Order

const deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findByIdAndRemove({_id: orderId})

        if(!order){
            return res.status(404).json({msg : `No Order found with id: ${orderId}`})
           }

        return res.status(200).json({ status: true, mss: `delected successfully` })


        
    } catch (error) {
        next(error)
        
    }
    
}

module.exports = {
    createOrder,
    getAnOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
}