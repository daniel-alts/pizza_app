const orderModel = require('../models/orderModel')

//info on all orders
const OrderInfo = async (req, res, next) => {
    try {
        // check if user role is authenticated
        if (req.authenticatedUser.role !== 'Admin') {
            return res.status(401).send({ message: 'Access Denied' })
        }

        const orders = await orderModel.find({})
        const resObj = {}
        resObj.numberOfOrders = orders.length
        resObj.states = orders.reduce((obj, x) => {
            if (!obj[x.state]) obj[x.state] = 0
            obj[x.state]++
            return obj
        }, {})
        return res.json({ status: true, data: resObj })
    } catch (err) {
        next(err)
    }
}

//all orders
const AllOrders = async (req, res, next) => {
    try {
        let orders, returnObject = {}

        // Pagination
        let limitFromQuery = parseInt(req.query.limit)
        let pageFromQuery = parseInt(req.query.page)

        let limit = 5, page = 1 // default values
        if (!isNaN(limitFromQuery) && limitFromQuery > 0) limit = limitFromQuery

        const numberOfOrders = await orderModel.find({}).countDocuments().exec()
        const totalPages = Math.ceil(numberOfOrders / limit)
        if (!isNaN(pageFromQuery) && pageFromQuery <= totalPages) page = pageFromQuery

        const start = (page - 1) * limit
        const end = page * limit

        // Sort by total_price/createdAt
        const { price, date } = req.query

        if (price) {
            const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
            if (value) orders = await orderModel.find({}).sort({ total_price: value }).limit(limit).skip(start)
        } else if (date) {
            const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
            if (value) orders = await orderModel.find({}).sort({ created_at: value }).limit(limit).skip(start)
        }
        if (!orders) orders = await orderModel.find({}).limit(limit).skip(start)

        // prepare response data
        if (start > 0) {
            returnObject.previousPage = {
                page: page - 1,
                limit: limit,
            }
        }
        returnObject.currentPage = page
        if (end < numberOfOrders) {
            returnObject.nextPage = {
                page: page + 1,
                limit: limit,
            }
        }
        returnObject.totalPages = totalPages
        returnObject.orders = orders

        return res.json({ status: true, data: returnObject })
    } catch (err) {
        next(err)
    }
}

//order by id
const getOrderById = async (req, res, next) => {
    try {
        const { orderId } = req.params
        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(404).json({ status: false, data: null })
        }
        return res.json({ status: true, data: order })
    } catch (err) {
        next(err)
    }
}

//new order
const addNewOrder = async (req, res, next) => {
    try {
        const body = req.body

        const total_price = body.items.reduce((prev, curr) => {
            return (prev += curr.quantity * curr.price)
        }, 0)

        const orderObject = {
            items: body.items,
            created_at: new Date(),
            total_price,
        }

        const order = new orderModel(orderObject)
        order
            .save()
            .then((result) => {
                return res.status(201).json({ status: true, data: result })
            })
            .catch((err) => {
                res.status(500)
                console.log('Error creating order', err.message)
                return res.json({ error: 'Error creating order' })
            })
    } catch (err) {
        next(err)
    }
}

//update order state
const updateOrderById = async (req, res, next) => {
    try {
        // check if user role is authenticated
        if (req.authenticatedUser.role !== 'Admin') {
            return res.status(401).send({ message: 'Access Denied' })
        }

        const { id } = req.params
        const { state } = req.body

        const order = await orderModel.findById(id)

        if (!order) {
            return res.status(404).json({ status: false, data: null })
        }

        if (state < order.state) {
            return res.status(422).json({ status: false, data: null, message: 'Invalid operation' })
        }

        order.state = state

        await order.save()

        return res.json({ status: true, data: order })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

//delete order by id
const deleteOrderById = async (req, res, next) => {
    try {
        // check if user role is authenticated
        if (req.authenticatedUser.role !== 'Admin') {
            return res.status(401).send({ message: 'Access Denied' })
        }

        const { id } = req.params

        const order = await orderModel.findOne({ _id: id })
        const deleted = await order.remove()
        if (deleted) {
            return res.status(204).json({ status: true })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { OrderInfo, AllOrders, getOrderById, addNewOrder, updateOrderById, deleteOrderById }