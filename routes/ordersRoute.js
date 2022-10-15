const express = require('express')
const orderRoute = require('../routes/orders')

const ordersRouter = express.Router()

ordersRouter.get('/', (req, res) => {
    orderModel.find()
        .then(orders => {
            res.status(200).json(orders)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

ordersRouter.get('/:id', (req, res) => {
    const id = req.params.id
    ordersModel.findById(id)
        .then(orders => {
            res.status(200).send(orders)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
})

ordeesRouter.post('/', (req, res) => {
    const order = req.body
    order.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    orderModel.create(book)
        .then(order => {
            res.status(201).send(order)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

ordersRouter.put('/:id', (req, res) => {
    const id = req.params.id
    const order = req.body
    order.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    orderModel.findByIdAndUpdate(id, order, { new: true })
        .then(newOrder => {
            res.status(200).send(newOrder)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

ordersRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    orderModel.findByIdAndRemove(id)
        .then(order => {
            res.status(200).send(order)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})


module.exports = ordersRouter


