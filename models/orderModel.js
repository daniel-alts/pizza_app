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
			name: String,
			price: Number,
			size: {
				type: String,
				enum: ["m", "s", "l"],
			},
			quantity: Number,
		},
	],
});
OrderSchema.pre("save", async function (next) {
	let order = this;
	await order.items.reduce((prev, curr) => {
		prev += curr.price * curr.quantity;
		order.total_price = prev;
		next();
	}, 0);
});

// CHANGES THE FORMAT OF DOCUMENT RETURNED
// OrderSchema.set("toJSON", {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id =
// 			returnedObject._id.toString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 	},
// });
const Order = mongoose.model(
	"Order",
	OrderSchema
);

module.exports = Order;
