const express = require('express')
const router = express.Router()
// import controllers
const {createOrder, getSingleOrder, getAllOrders, updateOrder,deleteOrder } = require('../controller/order')

router.route('/order').post(createOrder)

router.route("/orders").get(getAllOrders)

router.route('/order/:id').get(getSingleOrder).patch(updateOrder).delete(deleteOrder)


module.exports = router