
require("dotenv").config()
const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');
const User = require('./userModel');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const auth = require("./auth");


const PORT = 3334

const app = express()

app.use(express.json());

app.post('/signup', async (req,res)=>{
    try{
        const{username,password} = req.body

        if(!(username && password)){
            res.status(400).send("all fields are required")
        }

        const oldUser  = await User.findOne({username})

        if(oldUser){
            return res.status(409).send("user already exists, login or try another username")
        }

        encryptedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            password:encryptedPassword
        })

         SECRET = process.env.SECRET

        const token =  jwt.sign({ username: user.username }, SECRET,{expiresIn:"2h"});

        user.token = token
        console.log(user)

        res.status(201).json(user)
    }catch(err){
        console.log(err)
    }

})

app.post('/login', async (req,res)=>{

    try{
        const {username,password} = req.body
        if(!(username && password)){
            return res.status(409).send("all fields are required to proceed")
        }

        const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
    }catch(err){
        console.log(err)
    }



})


app.get('/', (req, res) => {
    return res.json({ status: true })
})




app.post('/order',auth, async (req, res) => {
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

app.get('/order/:orderId',auth, async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

app.get('/orders', auth, async (req, res) => {
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
})

app.patch('/order/:id',auth, async (req, res) => {
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

app.delete('/order/:id', auth, async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


mongoose.connect('mongodb://localhost:27017')

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