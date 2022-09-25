const Users = require('../Models/userModels');
const AppError = require('../utils/AppError');
const responseHandler = require('../utils/responseHandler');

// global user variable
let user;

exports.deleteUser = async (req, res, next) => {
	try {
		user = await Users.findByIdAndDelete(req.params.id);

		new ResponseHandler(res, user, 200);
	} catch (err) {
		return next(new AppError(err.message, 404));
	}
};

exports.updateUser = async (req, res) => {
	try {
		user = await Users.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		new ResponseHandler(res, user, 200);
	} catch (err) {
		return next(new AppError(err.message, 404));
	}
};

exports.findUser = async (req, res) => {
	try {
		user = await Users.findById(req.params.id);

		new ResponseHandler(res, user, 200);
	} catch (error) {
		return next(new AppError(err.message, 404));
	}
};
