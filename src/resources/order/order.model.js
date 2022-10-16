const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    size: { type: String, enum: ['m', 's', 'l']},
    quantity: Number,
  }]
});

const Order = mongoose.model('Order', OrderSchema);

// async function run() {
//   await mongoose.connect('mongodb://0.0.0.0:27017')
//   Order

// }

// run()

module.exports = Order;