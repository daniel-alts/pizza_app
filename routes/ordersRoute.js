const express = require("express");
const app = express();
const ordersRoute = express.Router();
const orderModel = require("../models/order");
const moment = require("moment");

app.use(express.json());



ordersRoute.get("/", (req, res) => {
    const sorting = req.query.sort;
    const limitpage = req.query.limitpage
    const skippage = req.query.skippage
    orderModel.find({}).sort(sorting).limit(limitpage).skip(skippage)
    .then((orders) => {
        res.status(200).json({
            message: "Retrieving successful",
            data: orders
        })
    }).catch((err) => {
        console.log(err);
        res.status(err.status).json({
            message: "An Error occurred!",
        })
        })
})

ordersRoute.get("/:id", (req, res) => {
    const id = req.params.id;

    orderModel.findById(id).then((orders) => {
        res.status(200).json({order: orders})
    }).catch((err) => {
        console.log(err.message);
        res.send("User id not found");
    })
})


ordersRoute.post("/", (req, res) => {
     const requestMade = req.body;
     //console.log(requestMade);
    
     const total_price = requestMade.items.reduce((prev, curr) => {
        prev += curr.price;
        //const quantity = prev += curr.quantity;
        return prev;
    }, 0)

    const totalOrder = {
        created_at: moment().toDate(),
        state: 1,
        total_price,
        message: "Order created",
        items: requestMade.items,  
    }

    orderModel.create(totalOrder)
    .then((totalOrder) => {
        res.json({message: "Order Created Successfully!" , data: totalOrder})
    }).catch((err) => {
        console.log(err.message);
        res.send("Unfortunately, Order was not added. Try again!");
    })

})

ordersRoute.patch("/:id", (req, res) => {

    const id = req.params.id;
    const orders = req.body;

   orderModel.findByIdAndUpdate(id, orders, {new: true})
   .then((order) => {
        
        res.status(200).send(order)
        //console.log(order)
    })
})

ordersRoute.delete("/:id", (req, res) => {
    const id = req.params.id;

    orderModel.findByIdAndDelete(id).then((order) => {
        res.status(200).send("Order deleted successfully!");
    })
    
})

module.exports = { ordersRoute };