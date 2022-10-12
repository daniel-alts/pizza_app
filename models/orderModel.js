const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      size: { type: String, enum: ["m", "s", "l"] },
      quantity: { type: Number, required: true }
    }
  ]
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
