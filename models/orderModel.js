const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const { userSchema } = require('./userModel')

const OrderSchema = new Schema({
  _id: Number,
  state: { 
    type: Number, 
    default: 1 
  },
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    size: { 
      type: String, 
      enum: ['m', 's', 'l']
    },
    quantity: Number,
  }],
  location: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  created_at: Date,
  updated_at: Date,
  user: userSchema
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
