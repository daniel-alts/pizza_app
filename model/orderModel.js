const { response } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    created_at: { type: Date, required: true },
    state: { type: Number, default: 1 },
    total_price: Number,
    items: [{
        name: String,
        price: Number,
        size: { type: String, enum: ["m", "s", "l"] },
        quantity: Number,
    }, ],
});
// *convert id to String
// *Remove id object from response
// *Remove _v from response
orderSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        returnedObject.items.forEach((item) => {
            item.item_id = item._id.toString();
            delete item._id;
        });
    },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;