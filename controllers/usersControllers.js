const Users = require('../Models/userModels');
const AppError = require('../utils/AppError');
const ResponseHandler = require('../utils/responseHandler');
const Catch_Async = require('../utils/catchAsync');

// global user variable
let user;

exports.deleteUser = Catch_Async(async (req, res, next) => {
	user = await Users.findByIdAndDelete(req.params.id);
	new ResponseHandler(res, user, 200);
});

exports.updateUser = Catch_Async(async (req, res) => {
	user = await Users.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	new ResponseHandler(res, user, 200);
});
