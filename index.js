const express = require('express');
const dotenv = require('dotenv');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');
const userModel = require('./userModel');


dotenv.config({ path: './config.env'})
const app = express()

app.use(express.json());

const PORT = 3334


app.get('/', (req, res) => {
    return res.json({ status: true })
})




//Authorisation Middleware
app.use( async(req, res, next) => {
    const body = req.body
    if(!body){
        res.status(400).json({
            message: "No username or password provided"
        })
    return
    }
    const loginDetails = body
    const users = await userModel.find()
    const userFound = users.find((user) => {
        return user.username === loginDetails.username
    })

    if (!userFound){
        res.status(401).json({message:"User not found! Please sign up!"})
        return
    }    
    
    if (userFound.password !== loginDetails.password){
        res.status(401).json({message:"Invalid username or password!"})
        return
    }

    next();
});



app.post('/order', async (req, res) => {
    try{
        const body = req.body;

        const total_price = body.items.reduce((prev, curr) => {
                prev += curr.price
                return prev
        }, 0);
        const order = await orderModel.create(body)
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
    
})

// app.post('/order', async (req, res) => {
//     const body = req.body;

//     const total_price = body.items.reduce((prev, curr) => {
//         prev += curr.price
//         return prev
//     }, 0);

//     const order = await orderModel.create({ 
//         items: body.items,
//         created_at: moment().toDate(),
//         total_price
//     })

//     return res.json({ status: true, order })
//  })

app.get('/order/:orderId', async (req, res) => {
  try  {const  orderId = req.params.orderId;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
}catch (err){
    return res.json({ status: fail, message: err })
}
})

app.get('/orders', async (req, res) => {
//Sorting
 try   {const queryItems = {...req.query}
    const removedFields = ['sort', 'page', 'imit', 'fields']
    removedFields.forEach(el => delete queryItems[el])

    let query = orderModel.find(queryItems)

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
    return res.json({ status: fail, message: err })
}
})

app.patch('/order/:id', async (req, res) => {
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

app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


/**USER ROUTE */

app.get('/users', async (req, res) => {
    const users = await userModel.find()

    return res.json({ status: true, users })
})



app.post('/user', async (req, res) => {
    try{
        const user = await userModel.create(req.body)
        res.status(200).json({
            status: 'success',
            user
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
    
})

app.patch('/user/:id', async (req, res) => {
    try{
        const user = await userModel.findOneAndUpdate(req.body)
        res.status(200).json({
            status: 'success',
            user
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
})


//Delete user
app.delete('/user/:id', async (req, res) => {
    try{
        const user = await userModel.findOneAndDelete(req.body)
        res.status(200).json({
            status: 'success',
            user
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
})


mongoose.connect(process.env.DATABASE)
 
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})