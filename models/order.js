const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema({
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    size: { type: String, enum: ["m", "s", "l"] },
    quantity: Number,
  }]
});

module.exports = mongoose.model("Order", orderSchema);
