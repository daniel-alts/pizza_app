const orderModel = require('./schemas/ordersModel')
const moment = require("moment")
const mongoosePaginate = require('mongoose-paginate')
const jwt = require('jsonwebtoken')
const usersModel = require('./schemas/usersModel')



// Get all Orders
const getAllOrders = async (req, res) => {
    let orders = await orderModel.find()
    let sorting = req.query.sorting
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
    }

    if (sorting) {
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

    return orders
}

// Get order by id
const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        throw new Error(`Order with ID ${orderId} not found!`)
    }

    return order
}

// Post an order
const postAnOrder = async (req, res) => {
    const { user_type, ...body } = req.body;

    body.total_price = body.items.price * body.items.quantity
    body.created_at = moment().toDate()
    const newOrder = await orderModel.create(body)

    return newOrder;
}

// Update an order's state
const updateOrderState = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id)

    if (!order) {
        throw new Error(`Order with ID ${id} not found!`)
    }
    if (state < order.state) {
        throw new Error(`Invalid Operation!`)
    }

    order.state = state;

    await order.save()
    return order
}

// Delete order by id
const deleteOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await orderModel.deleteOne({ _id: id })
    return order
}

// Query Order by state
const queryOrderByState = async (req, res) => {
    var query = { state: req.query.state };
    var options = {
        offset: 3,
        limit: 3
    };
    const order = await OrderSchema.paginate(query, options)
}

// Generate Jwt
const generateJWT = async function (username, password) {

    const user = await usersModel.findOne({ username })
    if (!user) {
        throw new Error('Incorrect username!')
    }
    if (user.password !== password) {
        throw new Error('Username or password incorrect!')
    }

    const payload = { _id: user._id, username: user.username }
    const JWtoken = jwt.sign(payload, process.env.SECRET_KEY)

    return (JWtoken);
}


module.exports = {
    getAllOrders,
    getOrderById,
    updateOrderState,
    deleteOrderById,
    postAnOrder,
    queryOrderByState,
    generateJWT
}