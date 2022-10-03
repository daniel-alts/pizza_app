const { errorResponse, successResponse, handleError } = require("../utils/responses");
const models = require("../models");
const moment = require("moment");

async function createOrder(req, res) {
    try {
        const body = req.body;

        const total_price = body.items.reduce((prev, curr) => {
            prev += curr.price;
            return prev;
        }, 0);

        const order = await models.Order.create({
            items: body.items,
            created_at: moment().toDate(),
            total_price
        });
        return successResponse(res, 201, "Order created successfully.", order);
    } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error.");
    }
}

async function getAllOrders(req, res) {
    try {
        const { state, sort } = req.query;
        const queryObject = {};

        if (state) {
            queryObject.state = state;
        }

        let orders = await models.Order.find(queryObject);

        if (sort) {
            res.json(sort);
        }

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 3;
        const skip = (page - 1) * limit;

        orders = await orders.skip(skip).limit(limit);

        return successResponse(res, 201, "All orders.", orders);
    } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error.");
    }
}

async function getOrdersById(req, res) {
    try {
        const { orderId } = req.params;
        const order = await models.Order.findById(orderId);
        if (!order) return errorResponse(res, 404, "Order not found.");
        return successResponse(res, 201, "order fetched successfully.", order);
    } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error.");
    }
}

async function updateOrder(req, res) {
    try {
        const { state } = req.body;
        const { orderId } = req.params;
        const order = await models.Order.findByIdAndUpdate(orderId, { new: true });
        if (!order) return errorResponse(res, 404, "Order not found.");
        order.state = state;
        if (order < order.state) return errorResponse(res, 422, "Invalid operation.");
        return successResponse(res, 201, "order updated successfully.", order);
    } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error.");
    }
}

async function deleteOrder(req, res) {
    try {
        const { orderId } = req.params;
        const order = await models.Order.findByIdAndDelete(orderId);
        if (!order) return errorResponse(res, 404, "Order not found.");
        return successResponse(res, 201, "order deleted successfully.", order);
    } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error.");
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersById,
    updateOrder,
    deleteOrder
};


// app.post("/order", async (req, res) => {
//     const body = req.body;

//     const total_price = body.items.reduce((prev, curr) => {
//         prev += curr.price;
//         return prev;
//     }, 0);

//     const order = await orderModel.create({
//         items: body.items,
//         total_price
//     });

//     return res.json({ status: true, order });
// });

// app.get("/order/:orderId", async (req, res) => {
//     const { orderId } = req.params;
//     const order = await orderModel.findById(orderId);

//     if (!order) {
//         return res.status(404).json({ status: false, order: null });
//     }

//     return res.json({ status: true, order });
// });

// app.get("/orders", async (req, res) => {
//     const orders = await orderModel.find();

//     return res.json({ status: true, orders });
// });

// app.patch("/order/:id", async (req, res) => {
//     const { id } = req.params;
//     const { state } = req.body;

//     const order = await orderModel.findById(id);

//     if (!order) {
//         return res.status(404).json({ status: false, order: null });
//     }

//     if (state < order.state) {
//         return res.status(422).json({ status: false, order: null, message: "Invalid operation" });
//     }

//     order.state = state;

//     await order.save();

//     return res.json({ status: true, order });
// });

// app.delete("/order/:id", async (req, res) => {
//     const { id } = req.params;

//     const order = await orderModel.deleteOne({ _id: id});

//     return res.json({ status: true, order });
// });