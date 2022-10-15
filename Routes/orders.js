const express = require('express')
const router = express.Router()
const {createOrder, getSingleOrder, getAllOrders, updateOrder,deleteOrder } = require('../controller/order')

router.route("/").get(getAllOrders)
router.route("/").post(createOrder)

router.route('/:id').get(getSingleOrder)
router.route('/:id').patch(updateOrder)
router.route('/:id').delete(deleteOrder)


module.exports = router