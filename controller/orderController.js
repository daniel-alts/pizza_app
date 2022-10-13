const db = require('../models/model');
const moment = require('moment');


const orderModel = db.Order;
const userModel = db.User


async function createOrder (req, res, next){
    const body = req.body
    try {
        
        const total_price = body.items.reduce((prev, curr) => {
            prev += (curr.quantity * curr.price)
            return prev
        }, 0);

        const order = orderModel.create({
            items: body.items,
            created_at: moment().toDate(),
            total_price
        })

        return res.status(200).json({ 
            status: true, 
            order 
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
};

const getOrder = async (req, res, next) => {
    
    // const authenticatedUser = req.authenticateUser;
    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit)
    const skip = Math.abs((page - 1) * limit);
    const sort = {}
    if (req.query.sortBy && req.query.orderBy){
       sort[req.query.sortBy] = req.query.orderBy === 'desc' ? 1 : -1
    }
    
    try {
        
        const pizOrder = await orderModel.find();
        let orderLength = pizOrder.length;

        const order = await orderModel.find().sort(sort).skip(skip).limit(limit).exec()
        if (page || limit){
            return res.status(200).json({
                status: true,
                order,
                totalpages: Math.ceil(orderLength/limit),
                currentpage: page + 1 
            })
        }
        if (!page || !limit){
            const order = await orderModel.find()
            return res.status(200).json({
                status: true,
                order
            })
        }
        

    } catch (error) {
        console.log(error)
        next(next)
    }
}

const getOrderById = async (req, res, next) => {
 
    // const authenticatedUser = req.authenticateUser;
    const orderId = req.params.orderId;
    
    try {
        // if (!authenticatedUser) {
        //     return res.status(403).json({message: "Forbidden"})
        // }

        const order = await orderModel.findById(orderId);
        if(!order) {
            return res.status(404).json({status: false, order: null})
        }
        return res.status(200).json({status: true, order});

    } catch (error) {
        console.log("An error occurred while trying to get order", error)
        next(error)
    }
};

const patchOrder =  async (req, res, next) => {
    const id = req.params.id;
    const {state} = req.body;
    try {
        
        const order= await orderModel.findById(id)

        if(!order) {
            return res.status(404).json({ 
                status: false,
                order: null
            })
        }

        if (state < order.state) {
            return res.status(422).json({
                status: false,
                order: null,
                message: 'Invalid operation'
            })
        }

        order.state = state;
        await order.save()
        return res.json({
            status: true,
            order
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
};

const deleteOrderbyId = async (req, res, next) => {
    // const authenticatedUser = req.authenticateUser;
    const id = req.params.id;

    // if (!authenticatedUser) {
    //     return res.status(403).json({message: "Forbidden"})
    // }
    // if (authenticatedUser.role !== "admin"){
    //     return res.status(401).json({message: "Unauthorized"})
    // }
    try {
        const order = await orderModel.deleteOne({_id: id})
        return res.status(200).json({ status: true, order})

    } catch (error) {
        console.log(error)
        next(error)
    }

};

module.exports = {
    createOrder,
    getOrder,
    getOrderById,
    patchOrder,
    deleteOrderbyId
}