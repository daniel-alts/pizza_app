const express = require("express");
const orderModel = require("../models/orderModel");

const getOrderParams = require('./getOrderParams')
const {authenticate} = require('../auth')

const moment = require("moment");

const orderRouter = express.Router();


orderRouter.post("/", async (req, res) => {

  //authentication
  authenticate(req,res).then(async ()=>{
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
    return ;
  })
  

});


orderRouter.get("/:orderId", async (req, res) => {
  authenticate(req,res).then(async ()=>{
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)
    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }
    return res.json({ status: true, order })
  }).catch(()=>{
    return
  })
  });
  


orderRouter.get("/", async (req, res) => {
  authenticate(req,res).then(async ()=>{
    const {total_price, state, created_at} = req.query
    
    getOrderParams({req, res, total_price, state, created_at} )
    
  }).catch(err=>{
    return 
  })
});

orderRouter.patch('/:id', async (req, res) => {
  authenticate(req,res).then(async ()=>{
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
})

orderRouter.delete('/:id', async (req, res) => {
  authenticate(req,res).then(async ()=>{
    const { id } = req.params;
    const order = await orderModel.deleteOne({ _id: id})
    return res.json({ status: true, order })
  }).catch(err=>{
    return 
  })
  
})


// orderRouter.get("/?total_price", async (req, res) => {
//   authenticate(req,res).then(async ()=>{
//     // Post.find({}).sort('test')
//     const orders = await orderModel.find({}).sort('total_price')
//     return res.json({ status: true, orders })
//   }).catch(err=>{
//     return 
//   })
// });




module.exports = orderRouter;
