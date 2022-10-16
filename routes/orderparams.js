const orderModel = require("../models/orderModel");
module.exports =  getOrderParams = async( {req, res ,total_price, created_at, state}) => {
  console.log(total_price)
  if (total_price && !created_at){
    if(state){
      const orders = await orderModel.find({state}).sort('total_price')
    return res.json({ status: true, orders })
    }
    const orders = await orderModel.find().sort('total_price')
    return res.json({ status: true, orders })
  }
  if (!total_price && created_at){
    if(state){
      const orders = await orderModel.find({state}).sort('total_price')
    return res.json({ status: true, orders })
    }
    const orders = await orderModel.find().sort('created_at')
    return res.json({ status: true, orders })
  }
  if (total_price && created_at){
    if(state){
      const orders = await orderModel.find({state}).sort('total_price')
    return res.json({ status: true, orders })
    }
    const orders = await orderModel.find().sort({ total_price: '1', created_at: 1 })
    return res.json({ status: true, orders })
  } else{
    if(state){
      const orders = await orderModel.find({state}).sort('total_price')
    return res.json({ status: true, orders })
    }
  
    const orders = await orderModel.find()
    return res.json({ status: true, orders })
  }


}