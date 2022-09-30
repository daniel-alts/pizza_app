const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

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

OrderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
