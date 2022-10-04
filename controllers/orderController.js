const orderModel = require("../models/orderModel");
const moment = require("moment");

const getOrders = async (req, res, next) => {
	const { price, state, date } = req.query;
	let orders;
	if (price) {
		const value =
			price === "asc"
				? 1
				: price === "desc"
				? -1
				: false;
		const orders = await orderModel
			.find({})
			.sort({ total_price: value });
		return res.json({ status: true, orders });
	} else if (state) {
		const value =
			state === "asc"
				? 1
				: state === "desc"
				? -1
				: false;
		const orders = await orderModel
			.find({})
			.sort({ state: value });
		return res.json({ status: true, orders });
	} else if (date) {
		const value =
			state === "asc"
				? 1
				: state === "desc"
				? -1
				: false;
		const orders = await orderModel
			.find({})
			.sort({ state: value });
		return res.json({ status: true, orders });
	}

	if (!orders) {
		const orders = await orderModel.find({});
		return res.json({ status: true, orders });
	}
};

const postOrder = async (req, res) => {
	const body = req.body;
	const order = await orderModel.create({
		items: body.items,
	});
	return res.json({ status: true, order });
};

const getOrder = async (req, res) => {
	const { orderId } = req.params;
	const { userName } = req.userAuthenticated;

	const order = await orderModel.findById(
		orderId
	);

	if (!order) {
		return res
			.status(404)
			.json({ status: false, order: null });
	}

	return res.json({ status: true, order });
};

const updateOrder = async (req, res) => {
	const { id } = req.params;
	const { state, price } = req.body;
	const { role } = req.userAuthenticated;
	if (role === "admin") {
		const order = await orderModel.findById(id);

		if (!order) {
			return res
				.status(404)
				.json({ status: false, order: null });
		}

		if (state < order.state) {
			return res.status(422).json({
				status: false,
				order: null,
				message: "Invalid operation",
			});
		}

		order.state = state;
		order.items[0].price = price;

		await order.save();

		return res.json({ status: true, order });
	} else {
		return res.json("Unauthorized user");
	}
};

const deleteOrder = async (req, res) => {
	const { id } = req.params;
	const { role } = req.userAuthenticated;
	if (role === "admin") {
		const order = await orderModel.deleteOne({
			_id: id,
		});

		return res.json({ status: true, order });
	} else {
		return res.json("Unauthorized user");
	}
};
module.exports = {
	getOrders,
	postOrder,
	getOrder,
	updateOrder,
	deleteOrder,
};
