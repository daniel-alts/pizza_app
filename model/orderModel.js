const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderModel = new Schema({
  id: ObjectId,
  created_At: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [
    {
      name: String,
      price: Number,
      size: { type: String, enum: ['s', 'm', 'l'] },
      quantity: Number,
    },
  ],
});



module.exports = mongoose.model('orders', OrderModel);
