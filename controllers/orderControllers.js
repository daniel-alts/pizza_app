const moment = require('moment');
const orderModel = require('../Models/orderModel');

//  ! ---- Get All Orders
exports.getOrders = async (req, res) => {
	const orders = await orderModel.find();

	return res.json({
		status: true,
		result: orders.length,
		data: orders,
	});
};

// ! ------ Create Order

exports.createOrder = async (req, res) => {
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

	return res.json({ status: true, order });
};

// ! ------ FIND Order

exports.findOrder = async (req, res) => {
	const order = await orderModel.findById(req.params.id);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	return res.json({ status: true, order });
};

//

// ! ------ uPDATE Order

exports.updateOrder = async (req, res) => {
	const { id } = req.params;
	const { state } = req.body;

	const order = await orderModel.findById(id);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	if (state < order.state) {
		return res.status(422).json({
			status: false,
			order: null,
			message: 'Invalid operation',
		});
	}

	order.state = state;

	await order.save();

	return res.json({
		status: true,
		result: order.length,
		data: order,
	});
};

// ! ------ DELETE Order

exports.deleteOrder = async (req, res) => {
	const order = await orderModel.deleteOne({ _id: req.params.id });

	return res.json({ status: true, order });
};
