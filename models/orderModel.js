const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: {
    type :Date,
    default: Date.now()
  },
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    size: {
       type: String,
       enum:{ values: ['m', 's', 'l'],
              message: '{VALUE} is not supported'
            }
          },
    quantity: Number,
  }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
