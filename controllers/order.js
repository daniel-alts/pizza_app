const express = require('express')
const OrderModel = require("../models/order")
const moment = require("moment")
const { isLoggedIn } = require("../middlewares/middleware"); // import isLoggedIn custom middleware


const orderRoute = express.Router()


orderRoute.get("/", isLoggedIn, async (req, res) => {

    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  //send all todos with that user
  res.json(
    await OrderModel.find({ username }).catch((error) =>
    res.status(400).json({ error })
  )
);
  
   const orders = await OrderModel.find()
   return res.json({status: true, orders})


})




orderRoute.post("/", isLoggedIn, async (req, res) => {
    const body = req.body;
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  req.body.username = username; // add username property to req.body
  //create new todo and send it in response
  res.json(
    await OrderModel.create(req.body).catch((error) =>
      res.status(400).json({ error })
    )
  );
    
    const total_price = body.items.reduce((prev, curr) => {
           prev+=curr.price
           return prev
    }, 0);
    const order = await OrderModel.create({
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })

    return res.json({status: true, order})
})




orderRoute.get("/:orderId", isLoggedIn, async (req, res) => {

    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    const {orderId} = req.params;
    const order = await OrderModel.findById(orderId)

    if (!order) {
       return res.status(404).json({status: false, order: null})
    }


    //send target todo
  res.json(
    await OrderModel.findOne({ username, _id }).catch((error) =>
      res.status(400).json({ error })

    )


  );

  return res.json({status: true, order})
})




orderRoute.patch("/:id", async (req, res) => {
  const {id} = req.params;
  const {state} = req.body;
  const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  req.body.username = username; // add username property to req.body

  //update todo with same id if belongs to logged in User
  res.json(
    await OrderModel.updateOne({ username, _id }, req.body, { new: true }).catch(
      (error) => res.status(400).json({ error })
    )
  );

  const order = await OrderModel.findByIdAndUpdate(id)

  if (!order) {
    return res.status(404).json({status: false, order: null})
  }

  if (state < order.state) {
    return res.status(422).json({status: false, order: null, message: "invalid operation"})
  }
     order.state = state;
     
     await order.save()

     return res.json({status: true, order})
})







orderRoute.delete("/:id", async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    const _id = req.params.id;
    const {id} = req.params;

    //remove todo with same id if belongs to logged in User
  res.json(
    await OrderModel.remove({ username, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
    const order = await OrderModel.deleteOne({_id: id})
    return res.json({status: true, order})
})






module.exports = orderRoute;