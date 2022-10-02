const express = require('express')
const mongoose = require('mongoose')
const moment = require('moment');
const orderRouter = express.Router()
const orderModel = require('../schemas/ordersModel')
const userAuthenticator = require('../authentication/authenticationForOrders')
const { getAllOrders, getOrderById, postAnOrder, updateOrderState, deleteOrderById } = require('../utils')



orderRouter.post('/', async (req, res) => {
    
    userAuthenticator(req, res)
        .then(() => {
            postAnOrder(req, res)
        }).catch((err) => {
            res.status(401).end(err)
        })
})

orderRouter.get('/:orderId', async (req, res) => {
    userAuthenticator(req, res)
        .then(() => {
            getOrderById(req, res)
        }).catch((err) => {
            res.status(401).end(err)
        })

})




orderRouter.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    userAuthenticator(req, res)
        .then(() => {
            getAllOrders(req, res)
        }).catch((err) => {
            res.status(401).end(err)
        })

})

orderRouter.patch('/:id', async (req, res) => {
    userAuthenticator(req, res)
        .then(() => {
            updateOrderState(req, res)
        }).catch((err) => {
            res.status(401).end(err)
        })

})

orderRouter.delete('/:id', async (req, res) => {
    userAuthenticator(req, res)
        .then(() => {
            deleteOrderById(req, res)
        }).catch((err) => {
            res.status(401).end(err)
        })

})


module.exports = orderRouter