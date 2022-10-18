const moment = require("moment");
const orderModel = require("../models/orderModel");

async function getAllOrders(req, res) {
	const orders = await orderModel.find({});
	res.json({ status: true, orders });
}

// Find a single order by Id.
async function getOrder(req, res) {
	const { orderId } = req.params;
	const order = await orderModel.findById(orderId);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	res.json({ status: true, order });
}

async function postOrder(req, res) {
	const body = req.body;

	const total_price = body.items.reduce((prev, curr) => {
		prev += curr.price;
		return prev;
	}, 0);

	const order = await orderModel.create({
		items: body.items,
		created_at: moment().toDate(),
		total_price,
	});

	res.json({ status: true, order });
}

async function updateOrder(req, res) {
	const { orderId } = req.params;
	const { state } = req.body;

	await orderModel.findById(orderId).then((order) => {
		if (!order) {
			res.status(404).json({ status: false, order: null, message: "Order not found" });
		}
		if (state < 1) {
			res.status(422).json({ status: false, order: null, message: "Invalid operation" });
		}
		order.state = state;
		order.save().then(() => res.json({ status: true, order }));
	});
}

async function deleteOrder(req, res) {
	const { orderId } = req.params;

	await orderModel.findByIdAndDelete(orderId).then((order) => {
		res.json({ status: true, orders: order });
	});
}

module.exports = {
	getAllOrders,
	getOrder,
	postOrder,
	updateOrder,
	deleteOrder,
};
