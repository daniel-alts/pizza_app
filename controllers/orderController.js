const orderModel = require('../models/orderModel');

const getAllOrders = async (req, res) => {
	console.log(req.user);
	const { order, created_at, state, page, limit } = req.query;
	const sort = {};
	const where = {};
	const pageOptions = {
		page: +page || 1,
		limit: +limit || 10,
	};
	if (order) {
		sort.total_price = order === 'asc' ? 1 : -1;
	}
	if (created_at) {
		sort.created_at = created_at === 'asc' ? 1 : -1;
	}
	if (state) {
		where.state = +state;
	}

	const total_count = await orderModel.countDocuments();

	const orders = await orderModel
		.find(where)
		.sort(sort)
		.limit(pageOptions.limit)
		.skip(pageOptions.limit * (pageOptions.page - 1));

	return res.json({ status: true, orders, total_count, total_pages: Math.ceil(total_count / pageOptions.limit) });
};

const addOrder = async (req, res) => {
	const body = req.body;

	const total_price = body.items.reduce((prev, curr) => {
		prev += curr.price * curr.quantity;
		return prev;
	}, 0);

	const order = await orderModel.create({
		items: body.items,
		created_at: new Date().toJSON(),
		total_price,
	});

	return res.json({ status: true, order });
};

const getOrderById = async (req, res) => {
	const { orderId } = req.params;
	const order = await orderModel.findById(orderId);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	return res.json({ status: true, order });
};

const updateOrderById = async (req, res) => {
	const { id } = req.params;
	const { state } = req.body;

	const order = await orderModel.findById(id);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	if (state < order.state) {
		return res.status(422).json({ status: false, order: null, message: 'Invalid operation' });
	}

	order.state = state;

	await order.save();

	return res.json({ status: true, order });
};

const deleteOrder = async (req, res) => {
	const { id } = req.params;

	const order = await orderModel.deleteOne({ _id: id });

	return res.json({ status: true, order });
};

module.exports = {
	addOrder,
	getOrderById,
	getAllOrders,
	updateOrderById,
	deleteOrder,
};
