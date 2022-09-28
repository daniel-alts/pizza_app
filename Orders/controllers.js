const moment = require('moment');
const orderModel = require('./orderModel');


const get = async (req, res) => {
    return res.json({ status: true })
}

const post = async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
}

const getOrder = async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}

const getOrders = async (req, res) => {
    let {state, sort} = req.query
    const queryObject = {}
    
    // querying by state
    if(state) queryObject.state = state
    let result = orderModel.find(queryObject)

    // sorting functionality:options are [total_price, -total_price, date, -date, ]
    if(sort){
        sort = sort.split(',').join(' ')
        result = result.sort(sort)
    }

    // pagination
    // options are [page:page number, limit:no of products sent back]
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1)*limit;

    result = result.skip(skip).limit(limit);

    const orders = await result

    return res.json({ status: true, orders })
}

const updateOrder = async (req, res) => {
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
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
}

module.exports = {
    get,
    post,
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder
}