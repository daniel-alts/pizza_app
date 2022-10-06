const express =require("express")

const orderRouter = express.Router()
const  {
    getAllOrders,
    createOrder,
    getOrderByID,
    updateOrder,
    deleteOrder
                    } = require("../controllers/orderController")

//CRUD router for users
orderRouter.get('/', getAllOrders)
orderRouter.post("/", createOrder)
orderRouter.get("/:orderId", getOrderByID)
orderRouter.patch("/:orderId", updateOrder)
orderRouter.delete("/:orderId", deleteOrder)



module.exports = orderRouter