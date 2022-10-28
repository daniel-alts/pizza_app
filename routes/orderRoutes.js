const express = require('express')
const orderController = require('../controllers/orderController');

const orderRouter = express.Router()

orderRouter.get("/", orderController.getAllOrders)

orderRouter.get("/order/:id", orderController.getOneOrder)

orderRouter.post("/", orderController.createNewOrder)

orderRouter.patch("/order/:id", orderController.updateOneOrder)

orderRouter.delete("/order/:id", orderController.deleteOneOrder)



module.exports = orderRouter;
