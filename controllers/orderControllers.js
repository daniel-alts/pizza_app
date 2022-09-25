const moment = require('moment');
const orderModel = require('../Models/orderModel');
const ResponseHandler = require('../utils/responseHandler');
const AppError = require('../utils/AppError');

// !sort by T Price
exports.sortByTotalPrice = async (req, res, next) => {
	req.query.sort = '-total_price';
	// req.query.limit ='3'
	next();
};

exports.sortByState = async (req, res, next) => {
	req.query.sort = '-state';
	console.log('object');
	next();
};

//  ! ---- Get All Orders
exports.getOrders = async (req, res) => {
	// Build query
	// 1a) Filter query.
	const queryObj = { ...req.query };
	const excludedFields = ['page', 'sort', 'limit', 'fields'];
	excludedFields.forEach((el) => delete queryObj[el]);
	// console.log(req.query, queryObj);

	let query = await orderModel.find(queryObj);

	// 2) Sorting.
	if (req.query.sort) {
		query = query.sort(req.query.sort);
	}

	const orders = await query;
	new ResponseHandler(res, orders, 200);
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

	new ResponseHandler(res, order, 200);
};

// ! ------ FIND Order

exports.findOrder = async (req, res) => {
	const order = await orderModel.findById(req.params.id);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	new ResponseHandler(res, order, 200);
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
		return next(new AppError(' Invalid operation', 422));
	}

	order.state = state;
	await order.save();

	new ResponseHandler(res, order, 200);
};

// ! ------ DELETE Order

exports.deleteOrder = async (req, res) => {
	const order = await orderModel.deleteOne({ _id: req.params.id });

	new ResponseHandler(res, order, 200);
};
