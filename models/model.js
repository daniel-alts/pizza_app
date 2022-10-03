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


const UserSchema = new Schema({
  
  created_at: {
    type: Date,
    default: Date.now,
  },

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true,  
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  address: {
    type: String
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now
  },
});



const Order = mongoose.model('Order', OrderSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
  Order,
  User
}
