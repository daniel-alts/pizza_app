const { Router } = require("express");
const controllers = require("./order.controller");

const router = Router()

router
    .route('/')
    .get(controllers.checkAllOrder)
    .post(controllers.createOrder)


router
    .route('/:id')
    .get(controllers.checkOrderById)
    .patch(controllers.orderState)
    .delete(controllers.deleteOrder)


module.exports =  router