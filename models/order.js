const mongoose = require("mongoose");

const orderSchema = mongoose.Schema;

const orderModel= new orderSchema({
    created_at: Date,
    state: Number,
    total_price: Number,
    items: [{
        name: String,
        price: Number,
        size: {
            type: String,
            enum: ["s", "m", "l"]
        },
        quantity: Number,
    }]

})

module.exports = mongoose.model("orders", orderModel);