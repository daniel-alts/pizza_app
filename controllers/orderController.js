const { OrderModel } = require('../models')
const moment = require('moment');

async function createOrder (req, res){
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);
   
    
 const order = await OrderModel.create({ 
            items: body.items,
            created_at: moment().toDate(),
            total_price
        })
 .then((order)=>{
    res.status(200).json({
        message: "order successfully added!",
        data: order
       })
 }) .catch ((error) => {
        console.log(error)
        res.status(500).send(error)
    })
}

async function getOrder (req, res) {
    const orderId  = req.params.id;

    const order = await OrderModel.findById(orderId)
    .then((order)=>{
        res.status(200).json({
            message: "Order Found",
            data: order})
        }) .catch ((error)=> {
        console.log(error)
        res.status(500).send("An error occured while fecthing your order")
    })
}

async function getOrders (req, res) {
    const { query } = req;

    const { 
        created_at, 
        state, 
        order = 'asc', 
        order_by = 'created_at', 
        page = 1, 
        per_page = 10 
    } = query;

    const findQuery = {};

    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = state;
    }

    const sortQuery = {};

    const sortAttributes = order_by.split(',')

    for (const attribute of sortAttributes) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1
        }
    
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1
        }
    }


    const orders = await OrderModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

    return res.json({ status: true, orders })
}



async function updateOrder (req, res) { 
    const { id } = req.params;  
    const { state } = req.body; 
    const body = req.body
   
    const order = await OrderModel.findByIdAndUpdate(id, {"state": body.state, "items" : body.items},{new : true})

    .then((order)=>{
        res.status(200).send(order)
    }) 
    .catch ((error) => {
        console.log(error)
        res.status(500).send(error) 
    })


}

 

async function deleteOrder (req, res){
    const id  = req.params.id;

    await OrderModel.deleteOne({ _id: id})
        .then(()=>{
            res.status(200).send("Order deleted!")
        })
         .catch ((error) => {
        console.log(error)
        res.status(500).send("An error occured while fecthing your order")
    })

}





module.exports = {createOrder,
                    getOrder,
                    getOrders,
                    updateOrder,
                    deleteOrder
                }