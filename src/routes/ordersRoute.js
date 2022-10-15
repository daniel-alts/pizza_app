const express = require('express');
const ordersRoute = express.Router();
const orderController = require('../controllers/orderController');
// const { basicAuth } = require('../middlewares/authentication');



//Create an order
ordersRoute.post('/', 
    async (req, res, next) => {
        try {
            const orderDetails = req.body;
            await orderController.createOrder(req, res, orderDetails);
        } catch(error) {
            next(error);
        }
    }
); 


//Get order by Id
ordersRoute.get('/:orderId',
    async (req, res, next) => {
        try {
            const { orderId } = req.params;
            await orderController.getOrderById(req, res, orderId);
        } catch(error) {
            next(error);
        }
    }
)


//Get multiple orders in a given state
ordersRoute.get('/',
    async (req, res, next) => {
        try {
            const query = req.query;
            await orderController.searchOrders(req, res, query);
        } catch(error) {
            next(error);
        }
    }
)


//Update order with the specified Id
ordersRoute.patch('/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { state } = req.body;
            await orderController.updateOrder(req, res, id, state);
        } catch(error) {
            next(error);
        }
    }
)


//Delete order with the specified Id
ordersRoute.delete('/:id', 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await orderController.deleteOrder(req, res, id);
        } catch(error) {
            next(error);
        }
    }
)



module.exports = ordersRoute;
