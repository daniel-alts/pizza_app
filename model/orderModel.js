const { response } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    created_at: { type: Date, required: true },
    state: { type: Number, default: 1 },
    total_price: Number,
    items: [{
        name: String,
        price: Number,
        size: { type: String, enum: ["m", "s", "l"] },
        quantity: Number,
    }, ],
});

const order = mongoose.model("order", orderSchema);

module.exports = order;