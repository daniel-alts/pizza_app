const router = require("express").Router();
const  {userLogin} = require('../controllers/user')

const moment = require('moment');

const orderModel = require('../models/orderModel')
const {getOrderById,createOrder, updateOrder, deleteOrder,getAllOrders} = require('../controllers/order')

router.get("/all-order",async(req,res)=>{
   await getAllOrders(req,res,next)
})

router.post("/order", async (req, res) => {
   await createOrder(req,res)
  });


  
router.get("/order/:orderId", async (req, res) => {
   await getOrderById(req,res)
  });

router.post("/order", async (req, res) => {
   await createOrder(req,res)
  });

router.patch("/order", async (req, res) => {
  
     await updateOrder(req,res)
   });

router.delete("/order/:id",async (req,res)=>{
  await deleteOrder(req,res)
})   

 
module.exports=router