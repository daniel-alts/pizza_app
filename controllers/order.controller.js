const moment = require("moment");
const orderModel = require("../models/order.model");

async function createOrder(req, res, next) {
	try {
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

		return res.status(201).json({
			message: "Order created successfully",
			data: order,
		});
	} catch (error) {
		console.log(error);
	}
}

async function getOrderById(req, res) {
	const { orderId } = req.params;
	const order = await orderModel.findById(orderId);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	return res.json({ status: true, order });
}

async function getAllOrders(req, res) {
	const { page, count } = req.query;
	const orders = await orderModel
		.find()
		.sort({ created_at: 1 })
		.skip(page > 0 ? (page - 1) * count : 0)
		.limit(count);

	return res.json({ status: true, orders });
}

async function updateOrder(req, res) {
	const { id } = req.params;
	const { state } = req.body;

	const order = await orderModel.findById(id);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	if (state < order.state) {
		return res
			.status(422)
			.json({ status: false, order: null, message: "Invalid operation" });
	}

	order.state = state;

	await order.save();

	return res.json({ status: true, order });
}

async function deleteOrder(req, res) {
	const { id } = req.params;

	const order = await orderModel.deleteOne({ _id: id });

	return res.json({ status: true, order });
}

module.exports = {
	createOrder,
	getOrderById,
	getAllOrders,
	updateOrder,
	deleteOrder,
};
