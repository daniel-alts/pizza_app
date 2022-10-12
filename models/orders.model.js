const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const OrderSchema = new Schema({
  id: ObjectId,
  createdAt: Date,
  state: { type: Number, default: 1 },
  totalPrice: Number,
  items: [{
    name: String,
    price: Number,
    size: { type: String, enum: ['m', 's', 'l'] },
    quantity: Number,
  }],
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
