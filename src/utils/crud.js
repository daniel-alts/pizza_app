const moment = require('moment');


const createOrder = model => async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price * curr.quantity
        return prev
    }, 0);

    try {
        const order = await model.create({ 
            items: body.items,
            created_at: moment().toDate(),
            total_price
        })
        return res.status(201).json({ data: order })
    } catch (err) {
        console.log(err)
    }
}


const checkOrderById = model => async (req,res) => {
    const { orderId } = req.params;
    const order = await model.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.status(200).json({ data: order })
}


const checkAllOrder = model => async (req, res) => {
    const orders = await model.find()

    return res.status(200).json({ data: orders })
}


const orderState = model => async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await model.findById(id)

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


const deleteOrder = model => async (req, res) => {
    const { id } = req.params;

    const order = await model.deleteOne({ _id: id})

    return res.json({ status: true, order })
}


const crudControllers = model => ({
    createOrder: createOrder(model),
    checkOrderById: checkOrderById(model),
    checkAllOrder: checkAllOrder(model),
    orderState: orderState(model),
    deleteOrder: deleteOrder(model)
})

module.exports = {
    createOrder,
    checkOrderById,
    checkAllOrder,
    orderState,
    deleteOrder,
    crudControllers
}

