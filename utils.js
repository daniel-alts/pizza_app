const orderModel = require('./schemas/ordersModel')
const moment = require("moment")
const mongoosePaginate = require('mongoose-paginate')



const getAllOrders = async (req, res) => {
    let orders = await orderModel.find()
    let sorting = req.query.sortByTotalPrice
    let state = req.query.state
    let sortByDate = req.query.sortByDate

    if (state) {
        var query = { state: req.query.state };
        var options = {
            offset: 0,
            limit: 5
        };

        orders = await orderModel.paginate(query, options)
        orders = orders.docs
        console.log(orders.docs);
    }

    

    if (sorting != undefined) {
        sorting = sorting.toUpperCase()

        if (sorting === 'DESC') {
            orders.sort((order1, order2) => {
                return order2.total_price - order1.total_price
            })
        } else if (sorting === 'ASC') {
            orders.sort((order1, order2) => {
                return order1.total_price - order2.total_price
            })
        }
    }

    if (sortByDate != undefined) {
        sortByDate = sortByDate.toUpperCase()

        if (sortByDate === 'DESC') {
            orders.sort((order1, order2) => {
                return order2.created_at - order1.created_at
            })
        } else if (sortByDate === 'ASC') {
            orders.sort((order1, order2) => {
                return order1.created_at - order2.created_at
            })
        }
    }

    return res.json({ status: true, orders })
}

const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

const postAnOrder = async (req, res) => {
    const { user_type, ...body } = req.body;

    body.total_price = body.items.price * body.items.quantity
    body.created_at = moment().toDate()

    const order = await orderModel.create(body)

    return res.json({ status: true, order })
}

const updateOrderState = async (req, res) => {
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
}


const deleteOrderById = async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id })

    return res.json({ status: true, order })
}

const queryOrderByState = async (req, res) => {
    var query = { state: req.query.state };
    var options = {
        offset: 3,
        limit: 3
    };

    const order = await OrderSchema.paginate(query, options)
}


module.exports = {
    getAllOrders,
    getOrderById,
    updateOrderState,
    deleteOrderById,
    postAnOrder,
    queryOrderByState
}