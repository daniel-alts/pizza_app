const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  // state can be pending, inprogess, delivered
  state: { type: Number, default: 1 },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    // enums is literally fixed value..
    size: { type: String, enum: ['m', 's', 'l']}
  }],
    total_price: Number
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
