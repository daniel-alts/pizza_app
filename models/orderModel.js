const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: Number,
    default: 1,
  },
  total_price: Number,
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        enum: ["m", "s", "l"],
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("orders", OrderSchema);
