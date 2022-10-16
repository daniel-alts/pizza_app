const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const itemSchema = new Schema({
  name: String,
  price: Number,
  size: { type: String, enum: ['m', 's', 'l']},
  quantity: Number,
})

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [itemSchema]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
