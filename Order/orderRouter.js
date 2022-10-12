const express = require("express")
const orderModel = require("./orderModel")
const moment = require("moment")

const orderRoute = express.Router();

orderRoute.post('/', async (req, res) => {
    const body = req.body;
    const total_price = body.items.reduce((prev, curr) =>{
        prev += curr.price;
        return prev;
    }, 0);
    console.log(total_price);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })

    return res.json({ status: true, order })  
})

orderRoute.get("/price", async (req, res) => {
    let orders = await orderModel.find({});
    orders = orders.sort((a, b)=> a.total_price - b.total_price)

      if(!orders){
        res.status(404).send("Order not found!")
       }
      res.json({status: true, orders})
   });


   orderRoute.get("/time", async (req, res) => {
    let orders = await orderModel.find({});
      orders = orders.sort((a, b)=> a.created_at - b.created_at);
      if(!orders){
        res.status(404).send("Order not found!")
       }
      res.json({status: true, orders})
   });

   orderRoute.get("/state", async (req, res) => {
    const state = req.body.state;
    let orders = await orderModel.find({state: state});
      if(!orders){
        res.status(404).send("Order not found!")
       }
      res.json({status: true, orders})
   });

orderRoute.get('/', async (req, res) => {
    //add pagination
    const limitValue = req.query.limit || 1;
    const skipValue = req.query.skip || 0;
    const orders = await orderModel.find().limit(limitValue).skip(skipValue);

    return res.json({ status: true, orders })
})

orderRoute.get('/:orderId', async (req, res) => {
    const orderId  = req.params.orderId;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
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





module.exports = orderRoute;