const moment = require('moment');

const Orders = require('./orderModel');


exports.createOrder = async (req, res) => {
    try{
        const body = req.body;

        const total_price = body.items.reduce((prev, curr) => {
                prev += curr.price
                return prev
        }, 0);
        const order = await Orders.create(body)
        res.status(200).json({
            status: 'success',
            created_at: moment().toDate(),
            total_price,
            order
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getAllOrders = async (req, res, next) => {
    //Sorting
    try   {
        const queryItems = {...req.query}
        const removedFields = ['sort', 'page', 'imit', 'fields']
        removedFields.forEach(el => delete queryItems[el])

        let query = Orders.find(queryItems)

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }else{
        query = query.sort('created_at')
    }

    //Pagination
        const page = Number(req.query.page)  || 1 
        const limit = Number(req.query.limit) || 100
        const skip = (page - 1) * limit

        query = query.skip(skip).limit(limit)   

        const orders = await query

        return res.json({ status: true, orders })
    }catch(err){
        return res.json({ 
            status: 'fail', 
            message: err 
            })
        }
}

exports.getOrder = async (req, res) => {
      try  {const  orderId = req.params.orderId;
        const order = await Orders.findById(orderId)
    
        if (!order) {
            return res.status(404).json({ status: false, order: null })
        }
    
        return res.json({ status: true, order })
    }catch (err){
        return res.json({ status: fail, message: err })
    }
}

exports.updateOrder = async (req, res, next) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await Orders.findById(id)

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

exports.deleteOrder =  async (req, res) => {
        const { id } = req.params;
    
        const order = await Orders.deleteOne({ _id: id})
    
        return res.json({ status: true, order })
    }


