const orderModel = require("../models/orderModel");

const getOrders = async (req, res) => {
	let orders;
	if (req.query) {
		const { price, state, date } = req.query;
		if (price) {
			const value =
				price === "asc"
					? 1
					: price === "desc"
					? -1
					: false;
			const orders = await orderModel
				.find({})
				.sort({ total_price: value })
				.limit(5);
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
				.sort({ state: value })
				.limit(5);
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
				.sort({ state: value })
				.limit(5);
			return res.json({ status: true, orders });
		}
	}

	if (!orders) {
		const orders = await orderModel
			.find({})
			.limit(5);
		return res.json({ status: true, orders });
	}
};

const postOrder = async (req, res) => {
	const body = req.body;
	const order = await orderModel.create({
		items: body.items,
		created_at: new Date(),
	});
	if (!order) {
		return res.json({ status: false, order });
	}
	return res.json({ status: true, order });
};

const getOrder = async (req, res) => {
	const orderId = req.params.id;

	const order = await orderModel.findById(
		orderId
	);

	if (!order) {
		res.status(404);
		res.json({ status: false, order });
		return;
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
			res.status(404);
			res.json({ status: false, order: null });
			return;
		}

		if (state < order.state) {
			res.status(422);
			res.json({
				status: false,
				order: null,
				message: "Invalid operation",
			});
			return;
		}

		order.state = state;

		await order.save();

		res.status(201);
		res.json({ status: true, order });
		return;
	} else {
		res.status(404);
		res.json("Unauthorized user");
		return;
	}
};

const deleteOrder = async (req, res) => {
	const { id } = req.params;
	const { role } = req.userAuthenticated;
	if (role === "admin") {
		const order = await orderModel.deleteOne({
			_id: id,
		});

		if (order) {
			res.status(201);
			res.json({ status: true, order });
			return;
		}
	} else {
		res.json("Unauthorized user");
		res.status(404);

		return;
	}
};
module.exports = {
	getOrders,
	postOrder,
	getOrder,
	updateOrder,
	deleteOrder,
};
