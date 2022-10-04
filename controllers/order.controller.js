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

		return res.status(201).send(order);
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
	const { page, count, state, sortBy, orderBy } = req.query;

	const query = state ? { state } : {}; // query by a state if provided
  const order = orderBy === "desc" ? -1 : 1; // order by ascending order if not provided

	let sortedBy;
	switch (sortBy) {
		case "price":
			sortedBy = { total_price: order }; // sort the total_price from ascending to descending
			break;
		case "date":
			sortedBy = { created_at: order }; // sort the date created from asc to desc
			break;
		default: // sort by date if no sortBy query is provided
			sortedBy = { created_at: order };
			break;
	}

	const orders = await orderModel
		.find(query)
		.sort(sortedBy)
		.skip(page > 0 ? (page - 1) * count : 0)
		.limit(parseInt(count));

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
