const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
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
        required: [true, "Why won't your pizza have a name?"],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, "Why won't your pizza have a price?"],
      },
      size: { type: String, enum: ["m", "s", "l"] },
      quantity: {
        type: Number,
        required: [true, "We need to know the quantity."],
      },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
