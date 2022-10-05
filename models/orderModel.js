const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  created_at: {
    type: Date,
    default: moment().format(),
  },
  state: { type: Number, default: 1 },
  total_price: {
    type: Number,
    default: 0,
  },
  items: [
    {
      name: {
        type: String,
        required: [true, "You need a pizza name"],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, "You need a price"],
      },
      size: { type: String, enum: ["m", "s", "l"] },
      quantity: {
        type: Number,
        required: [true, "We need to know the quantity."],
      },
    },
  ],
});

const orderModel = mongoose.model("Order", OrderSchema);

module.exports = orderModel;
