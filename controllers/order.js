const moment = require('moment');
const orderModel = require('../model/orderModel')

async function getAllOrders(req, res){
    try{

        //Get the query string from url
        const queryParams = {...req.query}

        //exclude fields that may cause interference
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach((field) => delete queryParams[field])

        //query the database
        let query = orderModel.find(queryParams)

        //sort based on query
        if(req.query.sort){
            query = query.sort(`-${req.query.sort}`)
        }

        //Add pagination
        if(req.query.page){
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1
            const skip = (page - 1) * limit
            query = query.skip(skip).limit(limit)
            let numOfOrdersCollection = await orderModel.countDocuments()
            if(skip >= numOfOrdersCollection){
                throw new Error()
            }
        }

        const orders = await query;
        res.status(200).json({ status: true, orders })
        
  
   
    }catch(err){
        res.status(404).json({
            status: false,
            err
    })}
}


async function getOrderById(req, res){
    try{
        const { id } = req.params;
        
        const order = await orderModel.findById(id)
        

        if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

        return res.status(200).json({ status: true, order })
    }catch(err){
        res.status(500).json({
        status: 'Failed',
        err
    })
    }
}

async function addOrder(req, res){
    try{
        const body = req.body;
        const total_price = body.items.reduce((prev, curr) => {
           
        prev += (curr.price * curr.quantity)
        console.log(prev)
        return prev
    }, 0);
       
    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().format('MM/DD/YYYY'),
        total_price
    })
    order.save()
    
    return res.status(201).json({ status: true, order })
    }
    catch(err){
        res.status(500).json({
            status: 'Failed',
            err
        })
    }
}


async function updateOrder(req, res){
    try{
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
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            err
        })
    }
}

async function deleteOrder(req, res){
    try{
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id})
    
        return res.json({ status: true, order })
    }
    catch(err){
        res.status(500).json({
            status: 'Failed',
            err
        })
    }
}
module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}