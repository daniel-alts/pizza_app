const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  created_at: {type : Date, default: new Date()},
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    size: { type: String, enum: ['m', 's', 'l']},
    quantity: Number,
  }],
  username: {
    type: String,
    required: true
},
password :{
    type: String,
    required:true,
}, 
user_type: {
   type: String,
   enum:['user', 'admin']
}
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
