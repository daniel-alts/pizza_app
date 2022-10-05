const express = require("express")
const moment = require("moment")

const orderRoute = express.Router()
const orderModel = require("../model/orderModel")
const userModel = require("../model/userModel")

orderRoute.use(async(req,res,next)=>{
    const password = req.query.password
   
    const user = await userModel.find({status:password})
    console.log(user, "user")
    if (user.length>0) {
        next()
    }else{
        res.status(401).send({message: "unauthorized", data:"please register as a user"})
    }
})

orderRoute.post('/', async (req, res) => {
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
})

orderRoute.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

orderRoute.get('/', async (req, res) => {

    let orders = await orderModel.find()
    if(req.query.state){
        orders = await orderModel.find({status:req.query.state})
    }
   
    if(req.query.total_price === "asc"){
         orders = await orderModel.find().sort({total_price:1,_id:1})
        
    }
    if(req.query.total_price === "desc"){
        orders = await orderModel.find().sort({total_price:-1,_id:-1})
       
    }
    if(req.query.date === "asc"){
        orders = await orderModel.find().sort({created_at:1,_id:1})
        
    }
    if(req.query.date === "desc"){
        orders = await orderModel.find().sort({created_at:-1,_id:-1})
        
    }

   

    return res.json({ status: true, orders })
})

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

    await order.save()

    return res.json({ status: true, order })
})

orderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


module.exports = orderRoute