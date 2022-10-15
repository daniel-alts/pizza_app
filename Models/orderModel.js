const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: {type: Date, required: true},
  state: { type: Number, default: 1, required:true},
  total_price: Number,
  items: [{
    name:{type: String, required: true},
    price:{type : Number, required: true},
    size: { type: String, enum: ['m', 's', 'l'], required: true},
    quantity:{type: Number, required: true}
  }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
