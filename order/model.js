const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  state: { 
    type: Number, 
    default: 1 
  },

  total_price: {
    type: Number,
    min: 0,
  },

  items: [{
    name: String,
    price: Number,
    size: { type: String, enum: ['m', 's', 'l']},
    quantity: Number,
  }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
