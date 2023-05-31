const { OrderModel } = require('../models')
const moment = require('moment');
const Cache = require('../config/redis');

exports.createOrder = async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await OrderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })

    const cacheKey = `orders:${orderId}`;
    Cache.redis.set(cacheKey, JSON.stringify(order));
    
    return res.json({ status: true, order })
}

exports.getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

       

        // const cachedOrder = await Cache.redis.get(cacheKey);

        // if (cachedOrder) {
        //     // Cache hit
        //     return res.json({ status: true, order: JSON.parse(cachedOrder) })
        // }
    

        // Cache miss
        const order = await OrderModel.findById(orderId)

        const cacheKey = `orders:${orderId}`;
        Cache.redis.set(cacheKey, JSON.stringify(order));
        
    
        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }
    
        return res.json({ status: true, order })
    } catch (error) {
        console.log(error);
        return res.json({ status: false, order: null,  message: 'Server Error' })
    }
}

exports.getOrders  = async (req, res) => {
    const { query } = req;

    const { 
        created_at, 
        state, 
        order = 'asc', 
        order_by = 'created_at', 
        page = 1, 
        per_page = 10 
    } = query;

    const cacheKey = `orders:${created_at}:${state}:${order}:${order_by}:${page}:${per_page}`;

    const cachedOrder = await Cache.redis.get(cacheKey);

    if (cachedOrder) {
        // Cache hit
        return res.json({ status: true, orders: JSON.parse(cachedOrder) })
    }
    

    const findQuery = {};

    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = state;
    }

    const sortQuery = {};

    const sortAttributes = order_by.split(',')

    for (const attribute of sortAttributes) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1
        }
    
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1
        }
    }


    const orders = await OrderModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

    Cache.redis.setEx(cacheKey, 10, JSON.stringify(orders));
    return res.status(200).json({ status: true, orders })
}

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const cacheKey = `orders:${id}`;

    const order = await OrderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    Cache.redis.set(cacheKey, JSON.stringify(order));

    return res.json({ status: true, order })
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    const cacheKey = `orders:${id}`;

    const order = await OrderModel.deleteOne({ _id: id})

    Cache.redis.del(cacheKey);

    return res.json({ status: true, order })
}
