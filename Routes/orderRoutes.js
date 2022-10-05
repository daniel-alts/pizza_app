const moment = require("moment");
const orderModel = require("../models/orderModel");
const authenticateDetails = require('../basicAuthentication')
const express = require("express");
const orderRouter = express.Router()


  orderRouter.get("/",authenticateDetails, async (req, res,next) => {

  
    try{ const authenticatedUserDetails= req.authenticatedUser
      if(!authenticatedUserDetails){
    return res.status(403).send({message: "Forbidden"})
      }
      let orders
      const{price, date}= req.query
      if(price){
        const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
        if(value){
          orders= await orderModel.find({}).sort({total_price: value})
        }
      }
      else if(date){
        const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
        if(value){
          orders= await orderModel.find({}).sort({created_at: value})
        }
      }
      else orders = await orderModel.find({})
      return res.json({status:true, orders})
    }
  catch(err){
    next(err)
  }
  })


  orderRouter.get("/:orderId",authenticateDetails, async (req, res) => {

 
    const { orderId } = req.params;
  try {
    const authenticatedUserDetails= req.authenticatedUserDetails
      if(!authenticatedUserDetails){
    return res.status(403).send({message: "Forbidden"})
      }
      let orders
      const{price, date}= req.query
      if(price){
        const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
        if(value){
          orders= await orderModel.find({orderId}).sort({total_price: value})
        }
      }
      else if(date){
        const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
        if(value){
          orders= await orderModel.find({orderId}).sort({created_at: value})
        }
      } 
      return res.json({ status: true, orders }); 
  } catch (error) {
    if (!orderId) {
      return res.status(404).json({ status: false, order: null });
    }
  }
    
  });




  orderRouter.post("/", authenticateDetails, async (req, res) => {
 
    passedUserDetails= req.authenticatedUser
    if(!passedUserDetails){
      return res.status(404).send({message:"forbidden"})
    }
    
      const body = req.body;
  
    const total_price = body.items.reduce((prev, curr) => {
      prev += curr.price;
      return prev;
    }, 0);
  
    const order = await orderModel.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });
  
    return res.json({ status: true, order });
   
  });



  orderRouter.patch("/:id",authenticateDetails, async (req, res) => {
    passedUserDetails= req.authenticatedUser
    if(!passedUserDetails){
      return res.status.send({message:"forbidden"})
    }
    
    const { id } = req.params;
    const { state } = req.body;
  
    const order = await orderModel.findById(id);
  
    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }
  
    if (state < order.state) {
      return res
        .status(422)
        .json({ status: false, order: null, message: "Invalid operation" });
    }
  
    order.state = state;
  
    await order.save();
  
    return res.json({ status: true, order });
  });


  orderRouter.delete("/:id",authenticateDetails, async (req, res) => {
  

    passedUserDetails= req.authenticatedUserDetails
    if(!passedUserDetails){
      return res.status.send({message:"forbidden"})
    }
    
    const { id } = req.params;
  
    const order = await orderModel.deleteOne({ _id: id });
  
    return res.json({ status: true, order });
  });


  module.exports=orderRouter