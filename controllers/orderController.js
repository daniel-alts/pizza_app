const orderModel = require("../models/orderModel")
const getOrderParams = require('../routes/getOrderParams')
const {authorize} = require('../authorization')
const moment = require("moment");

async function getOrders(req,res,next){
  authorize(req,res).then(async ()=>{
    const {total_price, state, created_at} = req.query
    
    getOrderParams({req, res, total_price, state, created_at} )
    
  }).catch(err=>{
    return 
  })
  
}

async function getOrderById(req,res,next){
  authorize(req,res).then(async ()=>{
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)
    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }
    return res.json({ status: true, order })
  }).catch(()=>{
    return
  })

}
async function addOrder(req ,res, next){
 //authentication
 authorize(req,res)
  .then(async ()=>{
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

}).catch(err=>{
  return res.json({ status: false, message:"Couldn't add order" }) ;
})
}
async function updateOrder(req,res,next){
  authorize(req,res).then(async ()=>{
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
    }).catch(err=>{
      return;
    })
}
async function deleteOrder(req,res,next){
  authorize(req,res).then(async ()=>{
    const { id } = req.params;
    const order = await orderModel.deleteOne({ _id: id})
    return res.json({ status: true, order })
  }).catch(err=>{
    return 
  })

}


module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder
}