const express = require('express');
const orderRoute = express.Router()
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('../model/order');

// const express = require('express');
// const userRoute = express.Router()
// const moment = require('moment');
// const mongoose = require('mongoose');
// const userModel = require('../model/user');
const userController = require('../Controllers/userController')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
// const User = require('../model/user');
// const {
//     verifyToken,
//     verifyTokenAndAuthorization,
//     verifyTokenAndAdmin
// } = require("./verifyToken");


// app.get('/', (req, res) => {
//     return res.json({ status: true })
// })

// paginate orders
const index = (req, res, next) => {
    if(req.query.page && req.query.limit){
        orderModel.paginate({}, { page: req.query.page, limit: req.query.limit })
        .then(data =>{
            res.status(200).json({ data })
        })
        .catch(error => {
            res.status(400).json({ error })
    })
    } else {
        orderModel.paginate({}, { page: req.query.page, limit: req.query.limit })
        .then(data =>{
            res.status(200).json({ data })
        })
        .catch(error => {
            res.status(400).json({ error })
        })
    }
    
}

orderRoute.post('/', verifyToken, async (req, res) => {
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
})

orderRoute.get('/:orderId', verifyTokenAndAuthorization, async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

orderRoute.get('/', verifyTokenAndAdmin, async (req, res) => {
    const orders = await orderModel.find();

    return res.json({ status: true, orders });
})

orderRoute.put('/:id', verifyTokenAndAdmin, async (req, res) => {
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
})

orderRoute.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})

// Get users stat
orderRoute.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try{
        const income = await orderModel.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },
            { $project: { month: { $month: "$createdAt" }, sales: "$price", }, },
            { $group: { _id: "$month", total: { $sum: "$sales"}, }, },
        ]);
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
});

// // // // // // // // // // // //

// Update
// userRoute.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//     if(req.body.password){
//         req.body.password = CryptoJS.AES.encrypt(req.body.password, PASSWORD_SECRET_KEY).toString();
//     }
//     try{
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: req.body,
//             },
//             { new: true }
//         );
//         res.status(200).json(updatedUser)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

// // Delete
// userRoute.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//     try{
//         await User.findByIdAndDelete(req.params.id)
//         res.status(200).json('User has been deleted!')
//     } catch(err) {
//         res.status(500).json(err)
//     }
// })

// // Get User by ID
// userRoute.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
//     try{
//         const user = await User.findById(req.params.id);
//         const { password, ...others } = user._doc;
//         res.status(200).json(others);
//     } catch(err) {
//         res.status(500).json(err)
//     }
// });

// // Get All Users
// userRoute.get("/", verifyTokenAndAdmin, async (req, res) => {
//     const query = req.query.new;
//     try{
//         const users = query
//         ? await User.find().sort({ _id: -1 }).limit(5)
//         : await User.find();
//         res.status(200).json(users);
//     } catch(err) {
//         res.status(500).json(err)
//     }
// });

// // Get Users Stats
// userRoute.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try{
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1},
//                 },
//             }
//         ]);
//         res.status(200).json(data)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

// userRoute.get('/usertest', (req, res)=>{
//     res.send("User test is successful")
//     console.log("User test is successful")
// })

// userRoute.post('/posttest', (req, res)=>{
//     const test = req.body.username
//     console.log(test)
//     res.send(test)
// })

// userRoute.post('/signup', userController.signup)
// userRoute.post('/login', userController.login)

// userRoute.get("/", async (req, res)=>{
//     //return all books
//    await userModel.find({})
//         .then((users)=>{
//             res.status(200).send(users)
//         })
//         .catch((err)=>{
//             console.log(err)
//             res.status(500).send(err)
//         })
//     // res.send('Books Route!')
// })

// userRoute.post("/", async (req, res)=>{
//     //create all books
//     const pizza = req.body
//     console.log(pizza)

//    await userModel.create(pizza)
//         .then((pizza)=>{
//             res.status(201).send({
//                 message: "Book added successfully!",
//                 data: pizza
//             })
//         }).catch((err)=>{
//             res.status(400).send(err)
//         })

//     // res.send('Book Added!')
// })

// module.exports = userRoute

module.exports = orderRoute