const moment = require('moment');
const orderModel = require('../Models/orderModel');
const ResponseHandler = require('../utils/responseHandler');
const AppError = require('../utils/AppError');
const Catch_Async = require('../utils/catchAsync');

// GLobal order variable
// DO NOT EDIT
let order;

// !sort by T Price
exports.sortByTotalPrice = async (req, res, next) => {
	req.query.sort = '-total_price';
	next();
};

exports.sortByState = async (req, res, next) => {
	if (req.curUser.role !== 'Admin')
		next(
			new AppError(
				'Admin Privileges only, Cannot access resources',
				403,
			),
		);

	req.query.sort = 'state, total_price';
	next();
};

exports.queryByRole = async (req, res, next) => {
	// Users have access to only their orders

	if (req.curUser.role === 'Basic') {
		req.query.created_by = req.curUser.email;
	}
	next();
};

// get User Order

//  ! ---- Get All Orders
exports.getOrders = Catch_Async(async (req, res) => {
	// Build query

	let queryObj = { ...req.query };
	let query = orderModel.find(queryObj);
	if (req.query.sort) {
		const SORTBY = req.query.sort.split(',').join(' ');
		console.log(SORTBY);
		query = query.sort(SORTBY);
	}

	// 4) Pagination
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 100;
	const skip = (page - 1) * limit;

	// query order by details
	query = await query.skip(skip).limit(limit);

	if (req.query.page) {
		const orderCount = await orderModel.countDocuments();
		if (skip > orderCount)
			throw new Error('This page does not exist');
	}
	const orders = await query;
	new ResponseHandler(res, orders, 200);
});

// ! ------ Create Order

exports.createOrder = async (req, res) => {
	const { email } = req.curUser;
	const body = req.body;

	const total_price = body.items.reduce((prev, curr) => {
		prev += curr.price;
		return prev;
	}, 0);

	order = await orderModel.create({
		created_by: email,
		items: body.items,
		created_at: moment().toDate(),
		total_price,
	});

	new ResponseHandler(res, order, 200);
};

//

// ! ------ uPDATE Order
exports.updateOrder = async (req, res) => {
	const { id } = req.params;
	const { state } = req.body;

	order = await orderModel.findById(id);

	if (!order) {
		return next(new AppError(' Order not found ', 404));
	}

	if (state < order.state) {
		return next(new AppError(' Invalid operation', 422));
	}

	if (req.curUser.email !== order.created_by) {
		return next(new AppError('You can only update your Order', 403));
	}

	order.state = state;
	await order.save();

	new ResponseHandler(res, order, 200);
};

// ! ------ DELETE Order

exports.deleteOrder = Catch_Async(async (req, res, next) => {
	order = await orderModel.findById({ _id: req.params.id });

	console.log(req.curUser.email);
	console.log(order.created_by);

	if (req.curUser.email !== order.created_by) {
		return next(new AppError('You can only delete your Order', 403));
	}

	await orderModel.deleteOne({ _id: req.params.id });
	new ResponseHandler(res, null, 200);
});
