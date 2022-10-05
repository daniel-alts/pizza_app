const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId



const orderSchema = new Schema({

    id: ObjectId,
    created_at: Date,
    state: {type: Number, default: 1},
    total_price: Number,
    items: [{
        name: String,
        price: Number,
        size: {type: String, enum: ['m', 's', 'l']},
        quantity: Number,
    }]
});





module.exports = mongoose.model("orders", orderSchema);