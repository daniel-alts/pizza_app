const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	created_by: {
		type: String,
		required: [true, 'Order must have a user'],
	},
	created_at: Date,
	state: { type: Number, default: 0 },
	total_price: Number,
	__v: {
		type: Number,
		select: false,
	},
	items: [
		{
			name: String,
			price: Number,
			size: { type: String, enum: ['m', 's', 'l'] },
			quantity: Number,
		},
	],
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
