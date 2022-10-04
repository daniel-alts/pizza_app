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
            const { orderId } = req.params;
            await orderController.getOrderById(req, res, orderId);
        } catch(error) {
            next(error);
        }
    
       
    // const { orderId } = req.params;
    // const order = await orderModel.findById(orderId)

    // if (!order) {
    //     return res.status(404).json({ status: false, order: null })
    // }

    // return res.json({ status: true, order })
    }
)


//Get all orders
orderRoutes.get('/',
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin']); 
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
            await orderController.getAllOrders(req, res);
        } catch(error) {
            next(error);
        }
       
    // const orders = await orderModel.find()

    // return res.json({ status: true, orders })
    }
)


//Update order with the specified Id
orderRoutes.patch('/:id',
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin']); 
            if (!authPassed) {
                return res.status(401).json({ message: req.ERROR_MESSAGE }) //ERROR_MESSAGE was added to req object in the basicAuth middleware
            } else {
                next();
            }
        } catch(error) {
            next(error);
        }
    }, 
    async (req, res) => {
        try {
            const { id } = req.params;
            const { state } = req.body;
            await orderController.updateOrder(req, res, id, state);
        } catch(error) {
            next(error);
        }
    // const { id } = req.params;
    // const { state } = req.body;

    // const order = await orderModel.findById(id)

    // if (!order) {
    //     return res.status(404).json({ status: false, order: null })
    // }

    // if (state < order.state) {
    //     return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    // }

    // order.state = state;

    // await order.save()

    // return res.json({ status: true, order })
    }
)


//Delete order with the specified Id
orderRoutes.delete('/:id', 
    async (req, res, next) => {
        try {
            const authPassed = await basicAuth(req, ['admin']); 
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
            const { id } = req.params;
            await orderController.deleteOrder(id);
        } catch(error) {
            next(error);
        }
        
    // const { id } = req.params;

    // const order = await orderModel.deleteOne({ _id: id})

    // return res.json({ status: true, order })
    }
)



module.exports = orderRoutes;
