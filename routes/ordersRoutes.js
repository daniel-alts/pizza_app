const express = require('express')
const passport = require('passport');
const orderRouter = express.Router()
const { getAllOrders, getOrderById, postAnOrder, updateOrderState, deleteOrderById } = require('../utils')
require('../authentication/authJWT')

orderRouter.get('/', (req, res) => {
    getAllOrders(req, res)
        .then((orders) => {
            res.status(200).json(orders)
        }).catch((err) => {
            res.status(401).end(err)
        })
})

orderRouter.get('/:orderId', async (req, res) => {
    getOrderById(req, res)
        .then((order) => {
            res.status(200).json({ status: true, order })
        }).catch((err) => {
            res.status(401).end(err.message)
        })
})

orderRouter.post('/', async (req, res) => {
    postAnOrder(req, res)
        .then((newOrder) => {
            res.status(200).json({ status: true, newOrder })
        }).catch((err) => {
            res.status(401).end(err.message)
        })
})


orderRouter.patch('/:id', async (req, res) => {
    updateOrderState(req, res)
        .then((order) => {
            res.status(200).json({ status: true, order })
        }).catch((err) => {
            res.status(401).end(err.message)
        })
})



orderRouter.delete('/:id', async (req, res) => {
    deleteOrderById(req, res)
        .then((order) => {
            res.status(200).json({ status: true, order })
        }).catch((err) => {
            res.status(401).end(err)
        })

})


module.exports = orderRouter