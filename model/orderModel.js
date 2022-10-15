const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  state: {
    type: Number,
    default: 1
  },
  total_price: {
    type: Number
  },
  items: [{
    pizza_name: {
      type: String
    },
    price: {
      type: Number
    },
    size: {
      type: String,
      enum: ['s', 'm', 'l']
    },
    quantity: {
      type: Number
    }
  }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
