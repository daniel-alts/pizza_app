const express = require('express');
const moment = require('moment');
const orderModel = require('../models/orderModel');
const userModel =require('../models/userModel')
const { authenticateUser } = require('../authenticate/authentication')

require("dotenv").config()
const PORT = process.env.PORT

const orderRouter = express.Router()


const app = express()
app.use(express.json());


orderRouter.get('/', async (req, res, ) => {
    authenticateUser(req, res)
   
    const {price, orderDate, orderStatus} = req.query
    try{
    
    if (price){
    const pricesFound = await orderModel.find({}).sort({total_price: 1}).limit(4).skip(4)

    if(pricesFound){
    res.json({ status: true, pricesFound})
    } else {
    res.status(404).json({ status: false, pricesFound: null })
    }
   
    }  
    
    if(orderDate){
    const datesFound = await orderModel.find({}).sort({created_at: 1}).limit(4).skip(4)
    
    if(datesFound){
    res.json({ status: true, datesFound})
    } else {
    res.status(404).json({ status: false, datesFound: null })
    }
   }

    if(orderStatus){
    const statusFound = await orderModel.find({}).sort({state: 1}).limit(4).skip(4)
    
    if(statusFound){
       res.json({ status: true, statusFound})
    } else {
      res.status(404).json({ status: false, statusFound: null })
    }
   }

    const orders = await orderModel.find({}).limit(4).skip(4)
    res.json({ status: true, orders })

    }catch (error){
    res.status(400).json({
    data: error
    })
    }

})
    

    orderRouter.get('/:orderId', async (req, res, next) => {
    authenticateUser(req, res)
    const { orderId } = req.params.orderId;

    try{
    const orderById = await orderModel.findById(orderId).limit(4).skip(4)
    if (orderById){
    res.status(200).json({ status: true, orderById})
    } else {
    res.json({ status: false, orderById: null }) 
    }
    } catch(error){
    res.status(400).json({
    message: "Unable to get Order by IDs",
    data: error
    })
    }
    
    
})




orderRouter.post('/', async (req, res) => {
    authenticateUser(req, res)
    const body = req.body;
    try{
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
    } catch (error){
    res.status(400).json({
    message: "Unable to create items"
    })
    }
  
})


orderRouter.patch('/:id', async (req, res) => {
    authenticateUser(req, res)
    const { id } = req.params.id;
    const { state } = req.body;
    try{
    const order = await orderModel.findById(id)    
    if (!order) {
        res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
    } catch(error){
    res.status(400).json({
    message: "Unable to update items"        
    })
}
    

})

orderRouter.delete('/:id', async (req, res) => {
    authenticateUser(req, res)
    const { id } = req.params;
    try {
    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
    } catch(error){
        res.status(400).json({
        message: "Unable to delete items"        
        })
    }
})

module.exports = orderRouter