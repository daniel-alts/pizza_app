const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
  id: ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    min:[8, "password must not be less than 8"],
    required: true  
  },
  user_type: {
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now
  },
});


const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: {
    type: Number,
    min: [0, "Total price must not be less than 0"]},
  items: [{
    name: String,
    price: {
      type: Number,
      min: [0, "Price must not be less than 0"]
    },
    size: { type: String, enum: ['m', 's', 'l']},
    quantity: Number,
  }]
});


// The code in the UserScheme and OrderScheme pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.

UserSchema.pre(
  'save',
  async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next()
  }
);

// Validating user log in details
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);


module.exports = {
  Order,
  User
}
