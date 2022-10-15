const moment = require('moment')
const orderModel = require('../models/orderModel')

const createOrder = async (req,res,next)=>{
    const body = req.body;

    if(body.items){
    const total_price = body.items.reduce((prev,curr)=>{
        prev += curr.price
        return prev
    },0)
 }
try {
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

const getSingleOrder = async (req,res)=>{
    const { id } = req.params;
    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }
    return res.json({ status: true, order })
}

const getAllOrders = async (req,res)=>{
    const info = req.user
    const {sort,state}= req.query

    const queryObject = {}
    if(state){
        queryObject.state=state
    }

    let orders = orderModel.find(queryObject)
    if(sort){
        orders = orders.sort(sort)
    }
}

const updateOrder = async (req,res)=>{
    const { id } = req.params;
    const { state } = req.body;

   try {
    const order = await orderModel.findOneAndUpdate({_id:id},{state:state},{new:true})
    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }
    return res.json({ status: true, order })
   } catch (error) {
    return res.status(500).json({ status: false, error: error.message} )
   }
}

const deleteOrder = async (req,res)=>{
    const { id } = req.params;
    const order = await orderModel.deleteOne({ _id:id})
    return res.json({ status: true, order })
}

module.exports = {createOrder, getSingleOrder, getAllOrders, updateOrder,deleteOrder }