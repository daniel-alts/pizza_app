const orderModel = require('../model/orderModel');
const moment = require('moment');

exports.createOrders = async function (req, res, next){
    try {
        const body = req.body;
        const total_price = body.items.reduce((prev, currItem) => {
          prev += currItem.price * currItem.quantity;
          return prev;
        }, 0);
        const order = await orderModel.create({
          items: body.items,
          created_at: moment().toDate(),
          total_price,
        });
        return res.status(201).json({ status: true, order });
      } catch (error) {
        res.status(404).json({ message: "failed to post orders", error });
      }
    
}

exports.getAllOrders = async function (req, res, next){
    try {
        const queryObj = { ...req.query };
        const reservedkeys = ["sort", "page", "limit"];
        reservedkeys.forEach((key) => delete queryObj[key]);
        let orderQuery = orderModel.find(queryObj);
        // SORTING
        if (req.query.sort) {
          const sortBy = req.query.sort.split(",").join(" ");
          orderQuery = orderQuery.sort(sortBy);
        } else {
          orderQuery.sort({ state: -1 });
        }
        // PAGINATION
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 5;
        const skip = (page - 1) * limit;
        orderQuery.skip(skip).limit(limit);
        const orders = await orderQuery;
        return res
          .status(200)
          .json({ status: true, results: orders.length, orders });
      } catch (error) {
        res.status(404).json({ message: "can't get orders now", error });
      }
}

exports.getAllOrderById = async function (req, res, next){
    try {
        const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
    } catch (error) {
        next(error);
    }
    
}

exports.updateOrders = async function (req, res, next){
    try {
        const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
    } catch (error) {
        next(error);
    }
    
}

exports.deleteOrder = async function (req, res, next){
    try {
        const { id } = req.params;

        const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
    } catch (error) {
        next(error);
    }
    
}