const mongoose = require("mongoose");
const moment = require("moment"); // require
moment().format();

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [
    {
      name: String,
      price: Number,
      size: { type: String, enum: ["m", "s", "l"] },
      quantity: Number,
    },
  ],
});

const Order = mongoose.model("Orders", OrderSchema);

module.exports = Order;
