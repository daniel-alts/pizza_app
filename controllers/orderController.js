
const { OrderModel} = require('../models/orderModel')
const moment = require('moment')

const getAllOrders = async (req, res) => {
    const { query } = req.params;

    const {
        created_at,
        state,
        total_price,
        order = 'asc',
        order_by = 'created_at',
        page = 1,
        per_page = 10
    } = query;

    const orderQuery ={};

    if (created_at) {
        orderQuery.created_at = {
            $gt:ISODate("2021-01-01"),
            $lt:ISODate("2020-05-01")
            // $gt:moment(created_at).startOf('day').toDate(),
            // $lt: moment(created_at).endOf('day').toDate(),
        }
    }
    

    if (state) {
        orderQuery.state = state;
    }

    const sortQuery = {};
    const sortAttributes = order_by.split(',')

    // if (order = 'asc' && order_by) {
    //     sortQuery[order_by] = 1
    // } else {
    //     sortQuery[order_by] = -1
    // }


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

    return res.json({ status:true, orders})
}


const getOneOrder = async (req, res) => {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order})
}


const createNewOrder = async (req, res) => {
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
    
    return res.json({ status: true, order })

}


const updateOneOrder = async (req, res) => {
    const { id } = req.params;
    const { state} = req.body;

    const order = await OrderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null})
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null})
    }

    order.state = state;

    await order.save()
    return res.json({status: true, order })
}

const deleteOneOrder = async (req, res) => {
    const { id } = req.params;

    const order = await OrderModel.deleteOne({_id: id})

    return res.json({ status: true, order })
}


module.exports = {
    getAllOrders,
    getOneOrder,
    createNewOrder,
    updateOneOrder,
    deleteOneOrder
}