const moment = require('moment');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    userModel.find({})
        .then(result => {
            return res.json(result)
        })
        .catch(err => console.log(err))
}

const addUser = async (req, res) => {
    try{
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            password: hashedPassword
        }
        const newUser = new userModel(user);
        newUser.save()
            .then((result) => {
                return res.status(201).json({ status: true, data: result })
            })
            .catch((err) => {
                console.log('An error occured', err)
                return res.status(400).json({ status: false, message: err.message })
            })
    } catch(err) {
        res.json(err)
    };
}

const userLogin = async (req, res) => {
    const users = await userModel.find({});
    const user = users.find((user) => user.username = req.body.username);
    
    if(user == null){
        return res.status(400).send('cannot find user');
    }
    
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Access Granted');
        } else {
            res.send('Access Denied');
        };
    } catch {
        res.status(500).send();
    };
}

const createOrder = async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    });
    
    return res.json({ status: true, order });
}

const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);

    if (!order) {
        return res.status(404).json({ status: false, order: null });
    };

    return res.json({ status: true, order });
}

const getAllOrders = async (req, res) => {
    
    let orders;

    const { price, date } = req.query;

    if(price) {
        const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
        if(value){
            orders = await orderModel.find({}).sort({ total_price: value })
        };
    } else if (date) {
        const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
        if(value) {
            orders = await orderModel.find({}).sort({ created_at: value })
        };
    };
    if(!orders) {
        orders = await orderModel.find({})
    }
    return res.json({ status: true, orders });
}

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id);

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    };

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' });
    };

    order.state = state;

    await order.save();

    return res.json({ status: true, order });
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id});

    return res.json({ status: true, order });
}

module.exports = {
    getUsers,
    addUser,
    userLogin,
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder
}

