const express = require('express');
const moment = require('moment');
const orderModel = require('../models/orderModel');
const router = express.Router();



router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

router.get('/', async (req, res) => {
  let  query = {}
 const   {state} = req.query
 if (state){
    query = {state}
 }

 const {total_price, created_at, limit} = req.query

 let TotalP = {}
 let Created = {}
 let limiter = {}

 if(total_price==="asc") {
    TotalP={total_price : 1}
 }
 else if(total_price === "dsc"){
    TotalP = {total_price: -1}
 }
 else{TotalP  = {}}

 if(created_at == "asc"){
    Created==={created_at: 1}
 }
 else if(created_at == "dsc"){
 Created ={created_at: -1}
 }
 else{Created = {}}

 if(limit){
    limiter = {limit : parseInt(limit)}
 }
 

    const orders = await orderModel.find(query).sort(Created).sort(TotalP).limit(limiter.limit)

    return res.json({ status: true, orders })
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

module.exports = router;


