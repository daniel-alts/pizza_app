const router = require('express').Router()
const { get, post, getOrder, getOrders, updateOrder, deleteOrder } = require('./controllers')

router.get('/', get)
router.post('/order', post)
router.get('/order/:orderId', getOrder)
router.get('/orders', getOrders)
router.patch('/order/:id', updateOrder)
router.delete('/order/:id', deleteOrder)

module.exports = router