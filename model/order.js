const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mongoosePaginate = require('mongoose-paginate-v2')

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: { type: Number, required: true },
    size: { type: String, enum: ['m', 's', 'l']},
    quantity: Number,
  }]
});

OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
