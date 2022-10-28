const mongoose = require('mongoose');

const Schema = mongoose.Schema

const OrderModelSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    state: { type: Number, default: 1 },
    total_price: Number,
    items: [
        {
            name: { type: String},
            price: { type: Number},
            size: { type: String, enum: ['m', 's', 'l']},
            quantity: { type: Number}
        },
    ],
})



module.exports = mongoose.model('orders', OrderModelSchema)