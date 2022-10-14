const mongoose = require('mongoose');
const userSchema = require("./userModel");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  _id: Number,
  created_at: Date,
  updated_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    size: { type: String, enum: ['m', 's', 'l']},
    quantity: Number,
  }],
  user: userSchema
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
