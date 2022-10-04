const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ItemSchema = new Schema ({
    id: ObjectId,
    created_at: Date,
    state: { type: String, default: "Available" },
    item: {
        name: String,
        price: Number,
        size: { 
            type: String, 
            enum: ['m', 's', 'l']
        }
    }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
