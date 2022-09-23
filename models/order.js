const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: {type: Date, default: Date.now},
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: {type: Number, required: true},
    size: { type: String, enum: ['s', 'm', 'l'], default: 'm'},
    quantity: {type: Number, default: 1, min: 1},
  }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
