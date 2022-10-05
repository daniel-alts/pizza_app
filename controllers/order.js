// ********************IMPORT DEPENDENCIES AND CREATE CONTROLLER FUNCTIONS ************/

const moment = require('moment');
const orderModel = require('../model/orderModel')


// **************GET ALL ORDERS ***************/


async function getAllOrders(req, res){
    try{
        const queryString = {...req.query}

        const excludedQuery = ['page', 'sort', 'limit']

        excludedQuery.forEach((field) => delete queryString[field])

        let query = orderModel.find(queryString)

        // ********** QUERY BY SORTING **************/ 
        if(req.query.sort){
            query = query.sort(`-${req.query.sort}`)
        }

    // **************ADD PAGINATION**********//

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

// *************RETURN ALL ORDERS *************//

        const orders = await query;
        res.status(200).json({ status: true, orders })
        
// **********CATCH ERROR IF ANY ***************//
    }catch(err){
        res.status(404).json({
            status: false,
            err
    })}
}

// **************GET ORDER BY ID ***************//

async function getOrderById(req, res){
    try{
        const { id } = req.params;
        
        const order = await orderModel.findById(id)
        
        if (!order) {
        return res.status(404).json({ status: false, order: null })
    }
        return res.status(200).json({ status: true, order })
    }
    catch(err){
        res.status(500).json({
        status: 'Failed',
        err
    })
    }
}

// **************CREATE ORDER BY ID ***************//

async function addOrder(req, res){
   
    try{
        const body = req.body;
        const total_price = body.items.reduce((prev, curr) => {
           
        prev += (curr.price * curr.quantity)
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

// ************** UPDATE ORDER *******************//

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
    
        return res.status(200).json({ status: true, order })
    }
    catch(err){
        res.status(500).json({
            status: 'Failed',
            err
        })
    }
}


// ************** DELETE ORDER **********************//

async function deleteOrder(req, res){
    try{
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id})
    
        return res.status(200).json({ status: true, order })
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