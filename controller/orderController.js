const  Order = require('../modals/orderModel')

const getOrdersInfo = async(req,res,next)=>{
    try{
      if(req.authenticatedUser.role!== 'admin'){
        return res.status(401).send({message:'Unauthorised'})
     }
     
     const orders = await Order.find({})
     const resObj = {}
     resObj.numberOfOrders = orders.length
     resObj.states = orders.reduce((obj,x) =>{
       if(!obj[x.state]) obj[x.state]   = 0
          obj[x.state]++
          return obj
     },{})
     return res.json({status:true, data:resObj})

    }catch(err){
        next(err)
    }
}


const getAllOrders = async (req, res , next) =>{
    try{
        let orders
        const {price,date} = req.query

        if(price){
            const value = price === 'asc'? 1 : price === 'desc' ? -1 :false
            if (value) orders = await  Order.find({}).sort({total_price:value})
        } else if (date){
            const value = date === 'asc' ? 1 : date === 'desc'? -1 :false
             console.log(value, 'value')
             if (value) orders = await Order.find({}).sort({created_at:value})
        }
        if(!orders) orders = await Order.find({})


    }catch (err){
        next(err)
    }
}

const getOrderById = async (req, res, next ) =>{
    try {
        const { orderId } = req.params
       const  order = await Order.findById(orderId)
    if (!order){
        return res.statues(404).json({statues:false, order:null})
    }
    return res.json({statues:true, order})
    }catch (err){
        next(err)
    }
}


const createOrder = async (req,res, next) =>{
    try{
        const body = req.body

        const total_price = body.items.reduce((prev, curr)=>{
            return (prev += curr.quantity * curr.price)
        },0)
        const orderObject = {
            items:body.items,
            created_at:new Date(),
            total_price,
        }
        const order = new Order(orderObject)
        order
        .save()
        .then((result) => {
            res.status(500)
            console.log('Error creating order' , err.message )
            return res.json({error:'Error creating order'})
           })
    }catch (error) {
        next(err)
    }
}

const upDateOrder = async (req, res, next)=>{
    try{
        if(req.authenticatedUser.role !== 'admin'){
            return res.statues(401).send({message:'Unauthorised'})
        } 
        const {id} = req.params
        const {state} = req.body

        const order = await Order.findById(id)
        if(!order){
            return res.statue(404).json({statues:false, order:null})
        }
        if (state <order.state){
            return res.status(422).json({ statues:false,order:null})
}
  order.state = state 
  await order.save()
  return res.json({status:true, order})
    }catch(err){
        console.log(err)
        next(err)
    }
}

const deleteOrder = async  (req,res, next) =>{
    try {
        if(req.authenticatedUser.role !== 'admin'){
            return res.status(401).send({message:'Unauthorised'})

        }
        const { id } = req.params

        const order = await Order.findOne({_id:id})
        const deleted = await order.remove()
        if (deleted){
            return  res.status(204).json({status: true})
        }
    }catch (err){
        next(err)
    }
}


module.exports = {getAllOrders,getOrderById,createOrder,getOrdersInfo, deleteOrder ,upDateOrder}


