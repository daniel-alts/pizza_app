const moment = require('moment')
const orderModel = require('../model/orderModel')

const createOrder = async (req,res,next)=>{
    const body = req.body;

    const total_price = body.items.reduce((prev,curr)=>{
        prev += curr.price
        return prev
    },0)
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
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const skip = (page-1)*limit

    orders = await orders.skip(skip).limit(limit)
    return res.json({ info,status: true, orders })
}

const updateOrder = async (req,res)=>{
    const { id } = req.params;
    const { state } = req.body;

   try {
    const order = await orderModel.findOneAndUpdate({_id:id},{state:state},{new:true,runValidators:true})

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