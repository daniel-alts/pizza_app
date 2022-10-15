const express = require("express");
const { object } = require("webidl-conversions");
const router = express.Router();
const orderModel = require("../model/orderModel");

/*Get Information about all orders*/
const getOrderInfo = async(rq, res, next) => {
    try {
        //Check if user is authenticated

        const orders = await orderModel.find({});
        const resObj = {};
        resObj.numberOfOrders = orders.length;
        resObj.states = orders.reduce((obj, x) => {
            if (!obj[x.state]) obj[x.state] = 0;
            obj[x.state]++;
            return obj;
        }, {});
        return res.json({ status: true, data: resObj });
    } catch (err) {
        next(err);
    }
};

/*Get all orders*/
const getAllOrders = async(req, res, next) => {
    try {
        let orders,
            returnObject = {};

        //PAGINATION
        let limitFromQuery = parseInt(req.query.limit);
        let pageFromQuery = parseInt(req.query.page);

        let limit = 5,
            page = 1; // default values
        if (!isNaN(limitFromQuery) && limitFromQuery > 0) limit = limitFromQuery;

        const numberOfOrders = await orderModel.find().countDocuments().exec();
        const totalPages = Math.ceil(numberOfOrders / limit);
        if (!isNaN(pageFromQuery) && pageFromQuery <= totalPages)
            page = pageFromQuery;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const { price, date } = req.query;

        if (price) {
            const value = price === "asc" ? 1 : price === "desc" ? -1 : false;
            if (value)
                orders = await orderModel
                .find(filter)
                .populate("user", { username: 1 })
                .sort({ total_price: value })
                .limit(limit)
                .skip(startIndex);
        } else if (date) {
            const value = date === "asc" ? 1 : date === "desc" ? -1 : false;
            if (value)
                orders = await orderModel
                .find()
                .populate("user", { username: 1 })
                .sort({ created_at: value })
                .limit(limit)
                .skip(startIndex);
        }
        if (!orders)
            orders = await orderModel
            .find()
            .populate("user", { username: 1 })
            .limit(limit)
            .skip(startIndex);

        if (startIndex > 0) {
            returnObject.previousPage = {
                page: page - 1,
                limit: limit,
            };
        }
        returnObject.currentPage = page;

        if (endIndex < numberOfOrders) {
            returnObject.nextPage = {
                page: page + 1,
                limit: limit,
            };
        }
        returnObject.totalPages = totalPages;
        returnObject.orders = orders;

        return res.json({ status: true, data: returnObject });
    } catch (err) {
        next(err);
    }
};

/*Get order by id*/
const getOrderById = async(req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).send.json({ status: false, order: null });
        }
        return res.status(404).json({ status: true, order });
    } catch (err) {
        next(err);
    }
};

/*Create a new order*/
const createOrder = async(req, res, next) => {
    try {
        const body = req.body;

        const total_price = body.items.reduce((prev, curr) => {
            return (prev += curr.quantity * curr.price);
        }, 0);

        const orderObject = {
            items: body.items,
            created_at: new Date(),
            total_price,
        };

        const order = new orderModel(orderObject);
        order
            .save()
            .then((result) => {
                return res.status(201).json({ status: true, result });
            })
            .catch((err) => {
                res.send(500);
                console.log("Error creating order", err.message);
                return res.json({ error: "Error creating order" });
            });
    } catch (err) {
        next();
    }
};

/*Update order state*/
const updateOrder = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { state } = req.body;

        const order = await orderModel.findById(id);

        if (!order) {
            return res.status(404).json({ status: false, order: null });
        }
        if (state < order.state) {
            return res
                .status(422)
                .json({ status: false, order: null, message: "Invalid operaton" });
        }
        order.state = state;

        await order.save();

        return res.json({ status: true, order });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

/*Delete order*/
const deleteOrder = async(req, res, next) => {
    try {
        const { id } = req.params;

        const order = await orderModel.findOne({ _id: id });
        const deleted = await order.remove();
        if (deleted) {
            return res.status(204).json({ status: true });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getOrderInfo,
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};