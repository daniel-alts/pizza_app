const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/orderController');
const { basicAuth } = require('../middlewares/authentication');



//Create an order
orderRoutes.post('/', 
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin', 'user']); 
            if (!authPassed) {
                return res.status(401).json({ message: req.ERROR_MESSAGE }) //ERROR_MESSAGE was added to req object in the basicAuth middleware
            } else {
                next();
            }
        } catch(error) {
            next(error);
        }
    }, 
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
orderRoutes.get('/:orderId', 
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin', 'user']); 
            if (!authPassed) {
                return res.status(401).json({ message: req.ERROR_MESSAGE }) 
            } else {
                next();
            }
        } catch(error) {
            next(error);
        }
    },
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
orderRoutes.get('/',
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin']); 
            if (!authPassed) {
                return res.status(401).json({ message: req.ERROR_MESSAGE }) 
            } else {
                next();
            }
        } catch(error) {
            next(error);
        }
    },
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
orderRoutes.patch('/:id',
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin']); 
            if (!authPassed) {
                return res.status(401).json({ message: req.ERROR_MESSAGE }) 
            } else {
                next();
            }
        } catch(error) {
            next(error);
        }
    }, 
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
orderRoutes.delete('/:id', 
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin']); 
            if (!authPassed) {
                return res.status(401).json({ message: req.ERROR_MESSAGE }) 
            } else {
                next();
            }
        } catch(error) {
            next(error);
        }
    }, 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await orderController.deleteOrder(req, res, id);
        } catch(error) {
            next(error);
        }
    }
)



module.exports = orderRoutes;
